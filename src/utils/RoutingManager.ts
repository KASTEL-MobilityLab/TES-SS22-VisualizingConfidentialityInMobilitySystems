import type { Trip } from "@/backend/dataFields";
import L from "leaflet";
import "leaflet-routing-machine";
import { toLeafletLatLng } from "./latLngUtils";
import type { VehicleMarker } from "./leafletExtension";
import { RouteEndIcon } from "./markerUtils";

/**
 * The Routing Manager takes care of displaying (showing and hiding) the routes on the map.
 */
export class RoutingManager {
  private readonly control: L.Routing.Control;
  private routes: Map<string, L.LatLng[]>;
  private readonly map: L.Map;
  private static readonly LINE_STYLING = [
    { color: "black", opacity: 1, weight: 10 },
    { color: "white", opacity: 0.8, weight: 6 },
    { color: "white", opacity: 1, weight: 2 },
  ];

  /**
   * Construct a new Routing manager.
   *
   * @param map the control is added to this map.
   * @param trips a list of trips with defined routes.
   */
  constructor(map: L.Map, trips: Trip[]) {
    this.map = map;
    const plan = new L.Routing.Plan([], {
      draggableWaypoints: false,
      addWaypoints: false,
      createMarker: this.createOnlyEndMarker,
      routeWhileDragging: false,
    });
    const router = L.Routing.mapbox(import.meta.env.VITE_MAPBOX_API_KEY, {
      profile: "mapbox/driving",
    });
    this.control = new L.Routing.Control({
      fitSelectedRoutes: false, // no zooming to the route
      addWaypoints: false, // disable adding waypoints by dragging
      show: false, // hide (minimize) the itinerary (the css hides it completely)
      plan: plan,
      router: router,
      lineOptions: {
        styles: RoutingManager.LINE_STYLING,
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
    }).addTo(map);
    this.routes = this.createAllRoutes(trips);
    L.Routing.errorControl(this.control, {}).addTo(map);
  }

  /**
   * Creates all displayable routes from a list of trips.
   */
  private createAllRoutes(trips: Trip[]) {
    const routes = new Map();
    for (const trip of trips) {
      if (!trip.route || !trip.vehicle) {
        throw new Error("Invalid trip given.");
      }
      const start = toLeafletLatLng(trip.route.start);
      const end = toLeafletLatLng(trip.route.end);
      routes.set(trip.vehicleId, [start, end]);
    }
    return routes;
  }

  /**
   * Shows the route for the given vehicle Id.
   *
   * @param vehicleId the route of the vehicle with this id is displayed
   */
  showRoute(vehicleId: string) {
    const waypoints = this.routes.get(vehicleId);
    if (!waypoints) {
      // vehicle is stationary, hide the possibly previously displayed route
      this.hideRoute();
      return;
    }
    this.control.setWaypoints(waypoints);
  }

  /**
   * Hides the currently displayed route.
   */
  hideRoute() {
    this.control.setWaypoints([]);
  }

  private createOnlyEndMarker(i: number, w: L.Routing.Waypoint, n: number) {
    if (i !== n - 1) {
      return false;
    }
    // last waypoint is normal marker
    return L.marker(w.latLng, {
      icon: RouteEndIcon,
    });
  }

  moveIcon(
    latLngStart: L.LatLngExpression,
    latLngEnd: L.LatLngExpression,
    marker: VehicleMarker
  ): void {
    this.control
      .on("routesfound", function (e: { routes: { coordinates: any[] }[] }) {
        e.routes[0].coordinates.forEach(function (
          coord: { lat: any; lng: any },
          index: number
        ) {
          setTimeout(function () {
            marker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index);
        });
      })
      .addTo(this.map);
  }
}
