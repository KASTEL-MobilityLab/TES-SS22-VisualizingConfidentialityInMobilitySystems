import L from "leaflet";

const iconAnchor: L.PointExpression = [0, 0];

/**
 * A helper function to easily create font awesome icons for use in leaflet markers.
 *
 * @param fontAwesomeClassString a string that contains all font awesome classes of the icon seperated by white space
 * @param iconSize the size of the icon
 * @returns a leaflet DivIcon ready to be used in a marker.
 */
export function createFontAwesomeIcon(
  fontAwesomeClassString: string,
  iconSize: L.PointExpression = [20, 20]
): L.DivIcon {
  return L.divIcon({
    html: `<i class=${fontAwesomeClassString}></i>`,
    iconSize: iconSize,
    iconAnchor: iconAnchor,
  });
}

export const bikeIcon = createFontAwesomeIcon("fa-solid fa-bicyle");
export const busIcon = createFontAwesomeIcon("fa-solid fa-bus");
export const trainIcon = createFontAwesomeIcon("fa-solid fa-train-subway");

export function createBikeMarker(latLng: L.LatLngExpression): L.Marker {
  return L.marker(latLng, {
    icon: bikeIcon,
  });
}
