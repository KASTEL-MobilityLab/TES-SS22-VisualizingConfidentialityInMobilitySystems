import type { Company } from "../Company";
import type { PublicVehicle } from "./PublicVehicle";

/**
 * The train class.
 */
export class Train implements PublicVehicle {
  readonly id: string;
  readonly companyId: string;
  readonly company: Company;

  constructor(id: string, companyId: string, company: Company) {
    this.id = id;
    this.companyId = companyId;
    this.company = company;
  }
}
