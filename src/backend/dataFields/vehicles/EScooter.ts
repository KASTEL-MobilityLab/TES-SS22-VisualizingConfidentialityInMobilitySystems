// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Expose } from "class-transformer";
import type { Company } from "../Company";
import {
  VehicleStatus,
  VehicleType,
  type CompanyId,
  type VehicleId,
} from "../types";
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
   * Constructs a new E-Scooter.
   *
   * @param id the id of the e-scooter.
   * @param companyId the id of the company the e-scooter belongs to.
   * @param status the status of the e-scooter (inactive or active).
   * @param condition the condition of the e-scooter between 0 and 100.
   * @param batteryCondition the battery condition of the e-scooter between 0 and 100.
   * @param batteryLevel the battery level of the e-scooter between 0 and 100.
   * @param company optionally, the actual company instance the e-scooter belongs to.
   */
  constructor(
    id: VehicleId,
    companyId: CompanyId,
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
