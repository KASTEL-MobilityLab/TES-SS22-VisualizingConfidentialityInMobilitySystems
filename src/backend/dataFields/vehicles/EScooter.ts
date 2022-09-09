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

  /**
   *
   * @param id The id of the vehicle.
   * @param companyId the id of the company the vehicle belongs to.
   * @param status the status of the vehicle (inactive or active).
   * @param condition the condition of the scooter between 0 and 100.
   * @param batteryCondition the battery condition of the scooter between 0 and 100.
   * @param batteryLevel the battery level of the scooter between 0 and 100.
   * @param company optionally, the actual company instance the vehicle belongs to.
   */
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
    this.batteryLevel = String(batteryLevel);
  }
}
