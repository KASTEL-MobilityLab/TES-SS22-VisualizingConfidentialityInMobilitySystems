import { Exclude, Expose } from "class-transformer";
import type { Company } from "./Company";
import type { DataField } from "./DataField";
import type { VehicleType } from "./types";

/**
 * The interface every vehicle must implement.
 */
export abstract class Vehicle implements DataField {
  @Expose()
  readonly id: string;
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
    this.id = id;
    this.companyId = companyId;
    this.type = type;
    if (company !== undefined) {
      this.company = company;
    }
  }

  get company() {
    if (this._company === undefined) {
      throw Error("Company has not been set yet.");
    }
    return this._company;
  }

  set company(c: Company) {
    if (c.id !== this.companyId) {
      throw Error(
        `Cannot set company with Company Id ${c.id}: Id does not match the company id of this vehicle ${this.companyId}`
      );
    }
    this._company = c;
  }
}
