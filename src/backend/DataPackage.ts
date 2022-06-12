import type { Payment, Trip, User, Vehicle } from "./dataFields";

/**
 * Class that contains all the data that can be dispalyed in the DataViewer after clicking on an icon in the user interface.
 * A DataPackage can be created either for a trip after clicking on driven trip or for a vehicle that is currently not active.
 */
export class DataPackage {
  user?: User;
  payment?: Payment;
  trip?: Trip;
  vehicle: Vehicle;

  /**
   * Construct a new DataPackage.
   * @param user The user of the DataPackage.
   * @param payment The payment of the DataPackage.
   * @param trip The trip of the dataPackage.
   * @param vehicle The Vehicle of the DataPackage.
   */
  constructor(user: User, payment: Payment, trip: Trip, vehicle: Vehicle) {
    this.user = user;
    this.payment = payment;
    this.trip = trip;
    this.vehicle = vehicle;
  }
}
