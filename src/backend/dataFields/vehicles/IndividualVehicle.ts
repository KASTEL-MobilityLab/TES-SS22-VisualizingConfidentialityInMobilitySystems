import type { Company } from "../Company";
import type { VehicleStatus, VehicleType } from "../types";
import { Vehicle } from "../Vehicle";

/**
 * This abstract class has to be extended by every Individually used vehicle like E-Scooters.
 */
export abstract class IndividualVehicle extends Vehicle {
  constructor(
    id: string,
    companyId: string,
    type: VehicleType,
    status: VehicleStatus,
    company?: Company
  ) {
    super(id, companyId, type, status, company);
  }
}
