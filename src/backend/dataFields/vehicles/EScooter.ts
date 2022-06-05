import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import type { IndividualVehicle } from "./IndividualVehicle";

/**
 * The E-Scooter Class.
 */
export class EScooter implements IndividualVehicle {
  @Expose()
  readonly id: string;

  @Expose()
  readonly type: VehicleType;

  @Expose()
  readonly companyId: string;

  @Exclude()
  company?: Company;

  @Type(() => Number)
  @Expose()
  condition: number;

  @Type(() => Number)
  @Expose()
  batteryCondition: number;

  @Expose()
  status: VehicleStatus;

  @Type(() => Number)
  @Expose()
  batteryLevel: number;

  constructor(
    id: string,
    companyId: string,
    condition: number,
    batteryCondition: number,
    status: VehicleStatus,
    batteryLevel: number,
    company?: Company
  ) {
    this.id = id;
    this.companyId = companyId;
    this.company = company;
    this.condition = condition;
    this.batteryCondition = batteryCondition;
    this.status = status;
    this.batteryLevel = batteryLevel;
    this.type = VehicleType.escooter;
  }
}
