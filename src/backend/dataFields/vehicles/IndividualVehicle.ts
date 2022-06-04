import type { Company } from "../Company";
import type { VehicleStatus, VehicleType } from "../types";
import type { Vehicle } from "../Vehicle";

/**
 * This interface has to be implemented by every Individually used vehicle like E-Scooters.
 */
export interface IndividualVehicle extends Vehicle {
  readonly type: VehicleType;
  status: VehicleStatus;
  readonly companyId: string;
  company?: Company;
}
