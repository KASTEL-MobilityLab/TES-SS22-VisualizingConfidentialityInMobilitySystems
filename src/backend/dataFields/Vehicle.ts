import { Exclude, Expose, Type } from "class-transformer";
import { LatLng } from "../utils/LatLng";
import type { Company } from "./Company";
import { DataField } from "./DataField";
import { VehicleStatus, type VehicleType } from "./types";

/**
 * The interface every vehicle must implement.
 */
export abstract class Vehicle extends DataField {
  @Expose()
  readonly companyId: string;
  @Expose()
  readonly type: VehicleType;
  @Expose()
  readonly status: VehicleStatus;
  @Exclude()
  private _company?: Company;

  @Type(() => LatLng)
  @Expose()
  currentPosition?: LatLng;

  constructor(
    id: string,
    companyId: string,
    type: VehicleType,
    status: VehicleStatus,
    company?: Company,
    currentPosition?: LatLng
  ) {
    super(id);
    this.companyId = companyId;
    this.type = type;
    this.status = status;
    if (company !== undefined) {
      this._company = company;
    }
    this.currentPosition = currentPosition;
  }

  get company() {
    if (!this._company) {
      throw Error("Company has not been set yet.");
    }
    return this._company;
  }

  set company(company: Company) {
    this.checkForeignKeyReferences(company, this.companyId);
    this._company = company;
  }

  /**
   * Returns true if the vehicle is currently in use.
   *
   * @returns true if the vehicle is currently in use, false otherwise.
   */
  isActive(): boolean {
    return this.status === VehicleStatus.Active;
  }
}
