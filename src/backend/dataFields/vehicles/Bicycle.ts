import { Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType, type VehicleStatus } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The Bicycle class.
 */
export class Bicycle extends IndividualVehicle {
  @Expose()
  electricLock: boolean;

  @Expose()
  electric: boolean;

  /**
   * Creates a new Bicycle.
   *
   * @param id the id of the bicycle.
   * @param companyId the id of the company the bicycle belongs to.
   * @param status the status of the bicycle (inactive or active).
   * @param electric whether the bicycle is electric or not.
   * @param electricLock whether the bicycle has an electric lock or not.
   * @param company optionally, the actual company instance the bicycle belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    electric: boolean,
    electricLock: boolean,
    company?: Company
  ) {
    super(id, companyId, VehicleType.Bike, status, company);
    this.electric = electric;
    this.electricLock = electricLock;
  }
}
