import type { Company } from "../Company";
import { VehicleType } from "../types";
import { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train extends PublicVehicle {
  constructor(id: string, companyId: string, company?: Company) {
    super(id, companyId, VehicleType.train, company);
  }
}
