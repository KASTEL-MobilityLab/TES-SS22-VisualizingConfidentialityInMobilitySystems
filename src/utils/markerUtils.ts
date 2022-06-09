import L from "leaflet";

const iconAnchor: L.PointExpression = [24, 24];

// used for css styling, to center the icon
const fontAwesomeCSSName = "fontAwesomeIconLeaflet";

export const bikeIcon = L.divIcon({
  html: "<i class='fa-solid fa-bicycle fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});
export const busIcon = L.divIcon({
  html: "<i class='fa-solid fa-bus fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});
export const trainIcon = L.divIcon({
  html: "<i class='fa-solid fa-train-subway fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});

export function createBikeMarker(latLng: L.LatLngExpression): L.Marker {
  return L.marker(latLng, {
    icon: bikeIcon,
  });
}
export function createBusMarker(latLng: L.LatLngExpression): L.Marker {
  return L.marker(latLng, {
    icon: busIcon,
  });
}
export function createTrainMarker(latLng: L.LatLngExpression): L.Marker {
  return L.marker(latLng, {
    icon: trainIcon,
  });
}
