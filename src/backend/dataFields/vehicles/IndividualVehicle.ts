import type { Company } from "../Company";
import type { VehicleType } from "../types";
import { Vehicle } from "../Vehicle";

/**
 * This interface has to be implemented by every Individually used vehicle like E-Scooters.
 */
export abstract class IndividualVehicle extends Vehicle {
  constructor(
    id: string,
    companyId: string,
    type: VehicleType,
    company?: Company
  ) {
    super(id, companyId, type, company);
  }
}
