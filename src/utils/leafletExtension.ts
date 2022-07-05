import type { Vehicle } from "@/backend/dataFields";
import type { Marker } from "leaflet";

// Note: This interface is necessary to stop the typechecker from complaining about missing properties.

/**
 * Extends L.Marker to add a vehicle to the marker.
 */
export interface VehicleMarker extends Marker {
  vehicle: Vehicle;
}
