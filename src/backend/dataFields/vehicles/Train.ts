import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train extends PublicVehicle {
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    company?: Company
  ) {
    super(id, companyId, VehicleType.Train, status, company);
  }
}
