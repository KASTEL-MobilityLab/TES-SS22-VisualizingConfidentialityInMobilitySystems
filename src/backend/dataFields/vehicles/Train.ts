import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train extends PublicVehicle {
  /**
   * Creates a new Train.
   *
   * @param id the id of the train.
   * @param companyId the id of the company the train belongs to.
   * @param status the status of the train (inactive or active).
   * @param company optionally, the actual company instance the train belongs to.
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
