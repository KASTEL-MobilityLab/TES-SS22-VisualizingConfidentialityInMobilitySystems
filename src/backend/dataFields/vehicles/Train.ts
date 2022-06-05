import { Exclude, Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType } from "../types";
import type { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train implements PublicVehicle {
  @Expose()
  readonly id: string;
  @Expose()
  readonly companyId: string;
  @Expose()
  readonly type: VehicleType;
  @Exclude()
  company?: Company;

  constructor(id: string, companyId: string, company?: Company) {
    this.id = id;
    this.companyId = companyId;
    this.type = VehicleType.train;
    this.company = company;
  }
}
