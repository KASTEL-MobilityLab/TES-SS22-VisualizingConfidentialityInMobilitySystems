import type { Vehicle } from "@/backend/dataFields";
import { VehicleType } from "@/backend/dataFields/types";
import L from "leaflet";
import { toLeafletLatLng } from "./latLngUtils";
import type { VehicleMarker } from "./leafletExtension";

const ICON_ANCHOR: L.PointExpression = [24, 24];
const ICONIFY_ICON_WIDTH = 45;
const ICONIFY_ICON_HEIGHT = 45;
const FONT_AWESOME_SIZE = 3;

// used for css styling, to center the icon
const ICON_CLASS = "vehicle-icon";

/**
 * Creates a new Iconify icon as a Leaflet DivIcon.
 * Uses the Iconify Web Component to fetch the icon from the Iconify API.
 *
 * @param iconIdentifier the identifier of the icon to use, e.g. ic:baseline-electric-escooter
 * @returns the new icon as L.DivIcon
 */
export function createIconifyIcon(iconIdentifier: string) {
  return L.divIcon({
    html: `<iconify-icon icon=${iconIdentifier} width=${ICONIFY_ICON_WIDTH} height=${ICONIFY_ICON_HEIGHT}></iconify-icon>`,
    iconAnchor: ICON_ANCHOR,
    className: ICON_CLASS,
  });
}

/**
 * Create a new Leaflet Icon for a given font awesome identifier.
 *
 * @param iconIdentifier the identifier of the icon to use, e.g. fa-bus
 * @param size the size of the icon, e.g. 3 for fa-3x (default)
 * @returns the new icon as L.DivIcon
 */
export function createFAIcon(
  iconIdentifier: string,
  size: number = FONT_AWESOME_SIZE,
  iconAnchor: L.PointExpression = ICON_ANCHOR
) {
  return L.divIcon({
    html: `<i class='fa-solid ${iconIdentifier} fa-${size}x'></i>`,
    iconAnchor: iconAnchor,
    className: ICON_CLASS,
  });
}

// Vehicle Icons --------------------------------------------------------
export const BIKE_ICON = createFAIcon("fa-bicycle");
export const BUS_ICON = createFAIcon("fa-bus");
export const TRAIN_ICON = createFAIcon("fa-train-subway");
export const E_SCOOTER_ICON = createIconifyIcon("ic:baseline-electric-scooter");
export const TAXI_ICON = createFAIcon("fa-taxi");
export const SHARED_CAR_ICON = createFAIcon("fa-car-side");

// -------------------------------------------------------------------

// Miscellaneous Icons -----------------------------------------------
export const ROUTE_START_ICON = createFAIcon("fa-bullseye", 2, [10, 16]);

export const ROUTE_END_ICON = createFAIcon("fa-location-dot", 2, [10, 10]);

// -------------------------------------------------------------------

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
export const VEHICLE_MARKERS: VehicleIcon[] = [
  { type: VehicleType.EScooter, icon: E_SCOOTER_ICON },
  { type: VehicleType.Bus, icon: BUS_ICON },
  { type: VehicleType.Train, icon: TRAIN_ICON },
  { type: VehicleType.Bike, icon: BIKE_ICON },
  { type: VehicleType.Taxi, icon: TAXI_ICON },
  { type: VehicleType.SharedCar, icon: SHARED_CAR_ICON },
];

/**
 * Creates a marker for a given vehicle at the position of this vehicle.
 *
 * @param vehicle Vehicle to create the icon for
 * @returns a L.Marker for this vehicle
 */
export function createMarker(vehicle: Vehicle): VehicleMarker {
  const vehicleIcon = VEHICLE_MARKERS.find(
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
