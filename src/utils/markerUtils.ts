import type { Vehicle } from "@/backend/dataFields";
import { VehicleType } from "@/backend/dataFields/types";
import L from "leaflet";
import { toLeafletLatLng } from "./latLngUtils";
import type { VehicleMarker } from "./leafletExtension";

const iconAnchor: L.PointExpression = [24, 24];

// used for css styling, to center the icon
const fontAwesomeCSSName = "fontAwesomeIconLeaflet";

const bikeIcon = L.divIcon({
  html: "<i class='fa-solid fa-bicycle fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});
const busIcon = L.divIcon({
  html: "<i class='fa-solid fa-bus fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});
const trainIcon = L.divIcon({
  html: "<i class='fa-solid fa-train-subway fa-3x'></i>",
  iconAnchor: iconAnchor,
  className: fontAwesomeCSSName,
});

/**
 * A VehicleIcon has a vehicle type and a associated icon.n
 */
interface VehicleIcon {
  type: VehicleType;
  icon: L.DivIcon;
}

/**
 * Defines all possible markers for each vehicle type.
 */
export const VehicleMarkers: VehicleIcon[] = [
  { type: VehicleType.EScooter, icon: bikeIcon }, // search escooter icon
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
  marker.bindPopup(
    "Clicked on marker of vehicle " +
      vehicle.id +
      " at position " +
      marker.getLatLng()
  );
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
