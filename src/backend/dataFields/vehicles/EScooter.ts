import { Expose, Type } from "class-transformer";
import "reflect-metadata";
import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The E-Scooter class.
 */
export class EScooter extends IndividualVehicle {
  @Type(() => Number)
  @Expose()
  readonly condition: number;

  @Type(() => Number)
  @Expose()
  readonly batteryCondition: number;

  @Expose()
  readonly status: VehicleStatus;

  @Type(() => Number)
  @Expose()
  readonly batteryLevel: number;

  constructor(
    id: string,
    companyId: string,
    condition: number,
    batteryCondition: number,
    status: VehicleStatus,
    batteryLevel: number,
    company?: Company
  ) {
    super(id, companyId, VehicleType.escooter, company);
    this.condition = condition;
    this.batteryCondition = batteryCondition;
    this.status = status;
    this.batteryLevel = batteryLevel;
  }
}
