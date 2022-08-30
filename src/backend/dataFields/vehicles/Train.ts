import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train extends PublicVehicle {
  /**
   * Creates a new train.
   *
   * @param id The id of the vehicle.
   * @param companyId the id of the company the vehicle belongs to.
   * @param status the status of the vehicle (inactive or active).
   * @param company optionally, the actual company instance the vehicle belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    company?: Company
  ) {
    super(id, companyId, VehicleType.Train, status, company);
  }
}
