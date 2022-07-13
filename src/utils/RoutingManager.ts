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
  private actualRoutes: Map<string, L.LatLng[]>;
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
    this.actualRoutes = new Map();
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
  /**
   * Get the Route for the given start and end point and profile (driving or cycling).
   * Request the Mapbox Directions API and caches the result.
   *
   * @param start the start of the route
   * @param end the end of the route
   * @param profile whether the route is for cycling or driving
   * @returns a promise of an array of L.LatLng's
   */
  async getRoute(
    start: L.LatLng,
    end: L.LatLng,
    profile: "cycling" | "driving" = "driving"
  ): Promise<L.LatLng[]> {
    // check if the request has already been made
    const maybeRoute: L.LatLng[] | undefined = this.actualRoutes.get(
      this.routeToStringKey([start, end], profile)
    );
    let route: L.LatLng[];
    if (!maybeRoute) {
      // request has not been made yet
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start.lat},${
          start.lng
        };${end.lat},${end.lng}?steps=true&geometries=geojson&access_token=${
          import.meta.env.VITE_MAPBOX_API_KEY
        }`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      route = data.geometry.coordinates;
      // add the route to the actualRoutes map for caching (future requests)
      this.actualRoutes.set(
        this.routeToStringKey([start, end], profile),
        route
      );
    } else {
      route = maybeRoute;
    }
    return route;
  }

  // a helper function to create a key for the actualRoutes map
  // because we cannot use the array `route` directly as a key
  private routeToStringKey(route: L.LatLng[], profile: "cycling" | "driving") {
    const key = route.map((latLng) => latLng.toString()).join(",");
    return key + "," + profile;
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
