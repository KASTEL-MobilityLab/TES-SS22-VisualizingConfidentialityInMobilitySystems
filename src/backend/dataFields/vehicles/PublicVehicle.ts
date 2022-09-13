import type { Company } from "../Company";
import type {
  CompanyId,
  VehicleId,
  VehicleStatus,
  VehicleType,
} from "../types";
import { Vehicle } from "../Vehicle";

/**
 * This interface has to be implemented by every publicly used vehicle like a train.
 */
export abstract class PublicVehicle extends Vehicle {
  /**
   * Constructor of the abstract class PublicVehicle.
   *
   * @param id the id of the public vehicle.
   * @param companyId the id of the company the public vehicle belongs to.
   * @param type the type of the public vehicle.
   * @param status the status of the public vehicle (inactive or active).
   * @param company optionally, the actual company instance the public vehicle belongs to.
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
