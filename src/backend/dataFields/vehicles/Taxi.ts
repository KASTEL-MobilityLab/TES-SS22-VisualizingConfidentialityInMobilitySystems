import { Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType, type VehicleStatus } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The Taxi class.
 */
export class Taxi extends IndividualVehicle {
  @Expose()
  numPassengers: number;

  @Expose()
  licensePlate: string;

  /**
   * Creates a new Taxi.
   *
   * @param id The id of the vehicle.
   * @param companyId the id of the company the vehicle belongs to.
   * @param status the status of the vehicle (inactive or active).
   * @param numPassengers the number of passengers the taxi can carry.
   * @param licensePlate the license plate of the taxi.
   * @param company optionally, the actual company instance the vehicle belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    numPassengers: number,
    licensePlate: string,
    company?: Company
  ) {
    super(id, companyId, VehicleType.Taxi, status, company);
    this.numPassengers = numPassengers;
    this.licensePlate = licensePlate;
  }
}
