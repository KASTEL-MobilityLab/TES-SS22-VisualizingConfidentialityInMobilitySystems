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

  //Possibly undefined name of the company that owns this vehicle.
  @Exclude()
  ownerName?: string;

  @Type(() => LatLng)
  @Expose()
  currentPosition?: LatLng;

  /**
   * Creates a new Vehicle.
   * @param id the id of the vehicle.
   * @param companyId the id of the company this vehicle belongs to.
   * @param type the type of the vehicle.
   * @param status the status of the vehicle.
   * @param company the company this vehicle belongs to.
   * @param currentPosition the current possition of the vehicle.
   */
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

  /**
   * Gets the company of the vehicle.
   */
  get company() {
    return this._company;
  }

  /**
   * Sets the company of the vehicle and checks for valid foreign key references.
   */
  set company(company: Company | undefined) {
    if (!company) {
      throw new Error("Cannot set the company of this vehicle to undefined.");
    }
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

  /**
   * Moves the vehicle to the given waypoint
   * @param waypoint Waypoint to which the vehicle moves to
   */
  move(waypoint: LatLng | undefined) {
    if (waypoint) {
      this.currentPosition = waypoint;
    }
  }
}
