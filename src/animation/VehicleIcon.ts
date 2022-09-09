import type { VehicleType } from "@/backend/dataFields/types";

/**
 * A VehicleIcon has a vehicle type and an associated icon.
 */
export interface VehicleIcon {
  type: VehicleType;
  icon: L.DivIcon;
}
