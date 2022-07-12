import type { VehicleMarker } from "./leafletExtension";

import type { Trip } from "@/backend/dataFields";
import L from "leaflet";
import "leaflet-routing-machine";
import { toLeafletLatLng } from "./latLngUtils";

/**
 * The Routing Manager takes care of displaying (showing and hiding) the routes on the map.
 */
export class RoutingManager {
  private readonly control: L.Routing.Control;
  private routes: Map<string, L.LatLng[]>;
  private readonly map: L.Map;

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
    });
    this.control = new L.Routing.Control({
      fitSelectedRoutes: false,
      plan: plan,
    }).addTo(map);
    this.routes = this.createAllRoutes(trips);
    this.control.hide();
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
      return;
    }
    this.control.setWaypoints(waypoints);
    this.control.hide();
  }

  /**
   * Hides the currently displayed route.
   */
  hideRoute() {
    this.control.setWaypoints([]);
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