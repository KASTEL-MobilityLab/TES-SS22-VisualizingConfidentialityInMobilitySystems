import type { Company } from "../Company";
import { VehicleType, type VehicleStatus } from "../types";
import type { IndividualVehicle } from "./IndividualVehicle";

/**
 * The E-Scooter Class.
 */
export class EScooter implements IndividualVehicle {
  readonly id: string;
  readonly type: VehicleType = VehicleType.escooter;
  readonly companyId: string;
  readonly company: Company;
  condition: number;
  batteryCondition: number;
  status: VehicleStatus;
  batteryLevel: number;

  constructor(
    id: string,
    companyId: string,
    company: Company,
    condition: number,
    batteryCondition: number,
    status: VehicleStatus,
    batteryLevel: number
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
