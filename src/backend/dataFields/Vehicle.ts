import { Exclude, Expose } from "class-transformer";
import type { Company } from "./Company";
import { DataField } from "./DataField";
import type { VehicleType } from "./types";

/**
 * The interface every vehicle must implement.
 */
export abstract class Vehicle extends DataField {
  @Expose()
  readonly companyId: string;
  @Expose()
  readonly type: VehicleType;
  @Exclude()
  private _company?: Company;

  constructor(
    id: string,
    companyId: string,
    type: VehicleType,
    company?: Company
  ) {
    super(id);
    this.companyId = companyId;
    this.type = type;
    if (company !== undefined) {
      this._company = company;
    }
  }

  get company() {
    if (this._company === undefined) {
      throw Error("Company has not been set yet.");
    }
    return this._company;
  }

  set company(company: Company) {
    this.checkForeignKeyReferences(company, this.companyId);
    /*
    if (company.id !== this.companyId) {
      throw Error(
        `Cannot set company with Company Id ${company.id}: Id does not match the company id of this vehicle id ${this.companyId}`
      );
    }
    */
    this._company = company;
  }
}
