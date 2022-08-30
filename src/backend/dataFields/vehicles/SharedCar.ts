import { Expose } from "class-transformer";
import type { Company } from "../Company";
import { VehicleType, type VehicleStatus } from "../types";
import { IndividualVehicle } from "./IndividualVehicle";

/**
 * The Shared Car class.
 */
export class SharedCar extends IndividualVehicle {
  @Expose()
  numPassengers: number;

  @Expose()
  licensePlate: string;

  @Expose()
  color: string;

  /**
   * Creates a new Shared Car.
   *
   * @param id The id of the vehicle.
   * @param companyId the id of the company the vehicle belongs to.
   * @param status the status of the vehicle (inactive or active).
   * @param numPassengers the number of passengers the car can carry.
   * @param licensePlate the license plate of the car.
   * @param color the color of the car.
   * @param company optionally, the actual company instance the vehicle belongs to.
   */
  constructor(
    id: string,
    companyId: string,
    status: VehicleStatus,
    numPassengers: number,
    licensePlate: string,
    color: string,
    company?: Company
  ) {
    super(id, companyId, VehicleType.SharedCar, status, company);
    this.numPassengers = numPassengers;
    this.licensePlate = licensePlate;
    this.color = color;
  }
}
