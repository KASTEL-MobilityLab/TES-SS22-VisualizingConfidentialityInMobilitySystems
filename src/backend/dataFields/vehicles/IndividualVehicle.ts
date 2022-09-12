import type { Company } from "../Company";
import type {
  CompanyId,
  VehicleId,
  VehicleStatus,
  VehicleType,
} from "../types";
import { Vehicle } from "../Vehicle";

/**
 * This abstract class has to be extended by every individually used vehicle like E-Scooters.
 */
export abstract class IndividualVehicle extends Vehicle {
  /**
   * Constructs a IndividualVehicle.
   *
   * @param id the id of the individual vehicle.
   * @param companyId the id of the company the individual vehicle belongs to.
   * @param type The type of the individual vehicle.
   * @param status the status of the individual vehicle (inactive or active).
   * @param company optionally, the actual company instance the individual vehicle belongs to.
   */
  constructor(
    id: VehicleId,
    companyId: CompanyId,
    type: VehicleType,
    status: VehicleStatus,
    company?: Company
  ) {
    super(id, companyId, type, status, company);
  }
}
