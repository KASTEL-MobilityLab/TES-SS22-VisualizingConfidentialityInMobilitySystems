declare const L: any;
import "leaflet-routing-machine";

export function createRoute(
  latLngStart: L.LatLngExpression,
  latLngEnd: L.LatLngExpression,
  map: L.Map
): void {
  L.Routing.control({
    waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
  }).addTo(map);
  L.Routing.control.remove();
}
