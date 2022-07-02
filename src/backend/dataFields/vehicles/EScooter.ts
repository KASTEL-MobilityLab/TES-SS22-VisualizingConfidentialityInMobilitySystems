import { Expose } from "class-transformer";
import "reflect-metadata";
import type { Company } from "../Company";
import { VehicleStatus, VehicleType } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The E-Scooter class.
 */
export class EScooter extends IndividualVehicle {
  @Expose()
  readonly condition: number;

  @Expose()
  readonly batteryCondition: number;

  @Expose()
  readonly batteryLevel: string;

  constructor(
    id: string,
    companyId: string,
    condition: number,
    batteryCondition: number,
    status: VehicleStatus,
    batteryLevel: number,

    company?: Company
  ) {
    super(id, companyId, VehicleType.EScooter, status, company);
    this.condition = condition;
    this.batteryCondition = batteryCondition;
    this.batteryLevel = String(batteryLevel) + "%";
  }
}
