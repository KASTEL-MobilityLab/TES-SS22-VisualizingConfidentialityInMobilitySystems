import { Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType, type LicensePlate, type VehicleStatus } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The Taxi class.
 */
export class Taxi extends IndividualVehicle {
  @Expose()
  numPassengers: number;

  @Expose()
  licensePlate: LicensePlate;

  /**
   * Creates a new Taxi.
   *
   * @param id the id of the taxi.
   * @param companyId the id of the company the taxi belongs to.
   * @param status the status of the taxi (inactive or active).
   * @param numPassengers the number of passengers the taxi can carry.
   * @param licensePlate the license plate of the taxi.
   * @param company optionally, the actual company instance the taxi belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    numPassengers: number,
    licensePlate: LicensePlate,
    company?: Company
  ) {
    super(id, companyId, VehicleType.Taxi, status, company);
    this.numPassengers = numPassengers;
    this.licensePlate = licensePlate;
  }
}
