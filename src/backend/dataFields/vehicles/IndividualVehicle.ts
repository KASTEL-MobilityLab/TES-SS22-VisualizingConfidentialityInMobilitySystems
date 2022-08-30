import type { Company } from "../Company";
import type { VehicleStatus, VehicleType } from "../types";
import { Vehicle } from "../Vehicle";

/**
 * This abstract class has to be extended by every Individually used vehicle like E-Scooters.
 */
export abstract class IndividualVehicle extends Vehicle {
  /**
   * Constructs a IndividualVehicle.
   *
   * @param id The id of the vehicle.
   * @param companyId the id of the company the vehicle belongs to.
   * @param type The type of the vehicle.
   * @param status the status of the vehicle (inactive or active).
   * @param company optionally, the actual company instance the vehicle belongs to.
   */
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
