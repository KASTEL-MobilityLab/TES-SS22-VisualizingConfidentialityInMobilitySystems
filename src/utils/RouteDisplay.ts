import L from "leaflet";
import { RouteEndIcon, RouteStartIcon } from "./markerUtils";

/**
 * Displays a route on a map. Hide the route by calling `hideRoute`. You can show it again by passing the waypoints to `showRoute`.
 */
export class RouteDisplay {
  private polyline: L.Polyline;
  private startMarker: L.Marker;
  private endMarker: L.Marker;
  private map: L.Map;

  private static readonly LINE_STYLING = {
    color: "#698196",
    opacity: 1,
    weight: 7,
  };

  /**
   * Construct a new RouteDisplay.
   *
   * @param map the map on which the route is displayed.
   */
  constructor(map: L.Map) {
    // create the instances at some location. The locations will
    // be updated when the user clicks on a vehicle.
    this.map = map;
    this.polyline = L.polyline([], RouteDisplay.LINE_STYLING);
    this.startMarker = L.marker(L.latLng(0, 0), { icon: RouteStartIcon });
    this.endMarker = L.marker(L.latLng(0, 0), {
      icon: RouteEndIcon,
    });
  }
  /**
   * Hides the route.
   */
  hideRoute() {
    this.polyline.removeFrom(this.map);
    this.startMarker.removeFrom(this.map);
    this.endMarker.removeFrom(this.map);
  }

  /**
   * Show the route with the given waypoints
   *
   * @param waypoints the waypoints that are used to update the route.
   */
  showRoute(waypoints: L.LatLng[]) {
    this.updateLocations(waypoints);
    this.polyline.addTo(this.map);
    this.startMarker.addTo(this.map);
    this.endMarker.addTo(this.map);
  }

  /**
   * Updates the locations of the polyline and markers of the displayed route.
   *
   * @param waypoints the waypoints that are used to update the route.
   */
  private updateLocations(waypoints: L.LatLng[]) {
    this.polyline.setLatLngs(waypoints);
    this.startMarker.setLatLng(waypoints[0]);
    this.endMarker.setLatLng(waypoints[waypoints.length - 1]);
  }
}
