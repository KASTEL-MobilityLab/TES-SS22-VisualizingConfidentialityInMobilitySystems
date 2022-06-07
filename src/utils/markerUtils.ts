import L from "leaflet";

const iconAnchor: L.PointExpression = [24, 24];
const fontAwesomeCSSName = "fontAwesomeIconLeaflet";

/**
 * A helper function to easily create font awesome icons for use in leaflet markers.
 *
 * @param fontAwesomeClassString a string that contains all font awesome classes of the icon seperated by white space
 * @param iconSize the size of the icon
 * @returns a leaflet DivIcon ready to be used in a marker.
 */
export function createFontAwesomeIcon(
  fontAwesomeClassString: string
): L.DivIcon {
  return L.divIcon({
    html: `<i class='${fontAwesomeClassString}'></i>`,
    iconAnchor: iconAnchor,
    className: "fontAwesomeIcon",
  });
}

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
