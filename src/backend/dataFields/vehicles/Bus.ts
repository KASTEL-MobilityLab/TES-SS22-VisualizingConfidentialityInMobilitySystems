import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { PublicVehicle } from "./PublicVehicle";

/**
 * The bus class.
 */
export class Bus extends PublicVehicle {
  /**
   * Creates a new bus.
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
    super(id, companyId, VehicleType.Bus, status, company);
  }
}
