import type { Vehicle } from "@/backend/dataFields";
import { VehicleType } from "@/backend/dataFields/types";
import L from "leaflet";
import { toLeafletLatLng } from "./latLngUtils";
import type { VehicleMarker } from "./leafletExtension";

const ICON_ANCHOR: L.PointExpression = [24, 24];
const ICONIFY_ICON_WIDTH = 40;
const ICONIFY_ICON_HEIGHT = 40;

// used for css styling, to center the icon
const ICON_CLASS = "fontAwesomeIconLeaflet";

/**
 * Creates a new Iconify icon as a Leaflet DivIcon.
 *
 * @param iconName the name of the icon to use
 * @returns the new icon as L.DivIcon
 */
export function createIconifyIcon(iconName: string) {
  return L.divIcon({
    html: `<iconify-icon icon=${iconName} width=${ICONIFY_ICON_WIDTH} height=${ICONIFY_ICON_HEIGHT}></iconify-icon>`,
    iconAnchor: ICON_ANCHOR,
    className: ICON_CLASS,
  });
}

export const bikeIcon = L.divIcon({
  html: "<i class='fa-solid fa-bicycle fa-3x'></i>",
  iconAnchor: ICON_ANCHOR,
  className: ICON_CLASS,
});
export const busIcon = L.divIcon({
  html: "<i class='fa-solid fa-bus fa-3x'></i>",
  iconAnchor: ICON_ANCHOR,
  className: ICON_CLASS,
});
export const trainIcon = L.divIcon({
  html: "<i class='fa-solid fa-train-subway fa-3x'></i>",
  iconAnchor: ICON_ANCHOR,
  className: ICON_CLASS,
});
export const E_SCOOTER_ICON = createIconifyIcon("ic:baseline-electric-scooter");

export const RouteEndIcon = L.divIcon({
  html: "<i class='fa-solid fa-bullseye fa-2x'></i>",
  iconAnchor: [10, 10],
  className: ICON_CLASS,
});

export const RouteStartIcon = L.divIcon({
  html: "<i class='fa-solid fa-location-dot fa-2x'></i>",
  iconAnchor: [10, 16],
  className: ICON_CLASS,
});

/**
 * A VehicleIcon has a vehicle type and a associated icon.
 */
interface VehicleIcon {
  type: VehicleType;
  icon: L.DivIcon;
}

/**
 * Defines all possible markers for each vehicle type.
 */
export const VehicleMarkers: VehicleIcon[] = [
  { type: VehicleType.EScooter, icon: E_SCOOTER_ICON }, // search escooter icon
  { type: VehicleType.bus, icon: busIcon },
  { type: VehicleType.train, icon: trainIcon },
];

/**
 * Creates a marker for a given vehicle at the position of this vehicle.
 *
 * @param vehicle Vehicle to create the icon for
 * @returns a L.Marker for this vehicle
 */
export function createMarker(vehicle: Vehicle): VehicleMarker {
  const vehicleIcon = VehicleMarkers.find(
    (vehicleIcon) => vehicleIcon.type === vehicle.type
  );
  if (!vehicleIcon) {
    throw Error("Could not find matching icon for VehicleType " + vehicle.type);
  }
  const position = vehicle.currentPosition;
  if (!position) {
    throw Error("Current Position of Vehicle " + vehicle.id + " is undefined");
  }
  const marker = <VehicleMarker>L.marker(toLeafletLatLng(position), {
    icon: vehicleIcon.icon,
  });
  marker.vehicle = vehicle;
  return marker;
}

/**
 * Generates all markers for a given list of vehicles.
 *
 * @param vehicles Generates the markers for all vehicles in the list.
 * @returns all markers for all vehicles in the list.
 */
export function generateAllVehicleMarkers(
  vehicles: Vehicle[]
): VehicleMarker[] {
  return vehicles.map((vehicle) => createMarker(vehicle));
}
