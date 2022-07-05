declare const L: any;
import "leaflet-routing-machine";

export function createRoute(
  latLngStart: L.LatLngExpression,
  latLngEnd: L.LatLngExpression,
  map: L.Map
): void {
  const route = L.Routing.control({
    waypoints: [L.latLng(latLngStart), L.latLng(latLngEnd)],
    routeWhileDragging: true,
  }).addTo(map);
  route.routing._container.style.display = "none";
  //map.removeControl(route);
  //L.Routing.control.remove();
}
