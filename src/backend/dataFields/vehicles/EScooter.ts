import { Exclude, Type } from "class-transformer";
import "reflect-metadata";
import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import type { IndividualVehicle } from "./IndividualVehicle";

/**
 * The E-Scooter Class.
 */
export class EScooter implements IndividualVehicle {
  readonly id: string;

  @Exclude()
  readonly type: VehicleType = VehicleType.escooter;

  readonly companyId: string;

  @Exclude()
  company?: Company;

  @Type(() => Number)
  condition: number;

  @Type(() => Number)
  batteryCondition: number;

  status: VehicleStatus;

  @Type(() => Number)
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
  }
}
