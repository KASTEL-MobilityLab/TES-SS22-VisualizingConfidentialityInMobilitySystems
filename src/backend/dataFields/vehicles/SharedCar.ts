import { Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType, type LicensePlate, type VehicleStatus } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The Shared Car class.
 */
export class SharedCar extends IndividualVehicle {
  @Expose()
  numPassengers: number;

  @Expose()
  licensePlate: LicensePlate;

  @Expose()
  color: string;

  /**
   * Creates a new Shared Car.
   *
   * @param id the id of the shared car.
   * @param companyId the id of the company the shared car belongs to.
   * @param status the status of the shared car (inactive or active).
   * @param numPassengers the number of passengers the shared car can carry.
   * @param licensePlate the license plate of the shared car.
   * @param color the color of the shared car.
   * @param company optionally, the actual company instance the shared car belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    numPassengers: number,
    licensePlate: LicensePlate,
    color: string,
    company?: Company
  ) {
    super(id, companyId, VehicleType.SharedCar, status, company);
    this.numPassengers = numPassengers;
    this.licensePlate = licensePlate;
    this.color = color;
  }
}
