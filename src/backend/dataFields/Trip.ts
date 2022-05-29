import type { Route } from "../Route";
import type { DataField } from "./DataField";
import type { Payment } from "./Payment";
import type { User } from "./User";
import type { Vehicle } from "./Vehicle";

/**
 * The Trip class. Connects User, Vehicle, Payment and Route together.
 */
export class Trip implements DataField {
  readonly id: string;
  readonly routeId: string;
  readonly vehicleId: string;
  readonly userId: string;
  readonly paymentId: string;
  readonly price: number;
  readonly startTime: string;
  readonly endTime: string;

  readonly vehicle: Vehicle;
  readonly user: User;
  readonly payment: Payment;
  readonly route: Route;

  constructor(
    id: string,
    routeId: string,
    vehicleId: string,
    userId: string,
    paymentId: string,
    price: number,
    startTime: string,
    endTime: string,
    vehicle: Vehicle,
    user: User,
    payment: Payment,
    route: Route
  ) {
    this.id = id;
    this.routeId = routeId;
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.paymentId = paymentId;
    this.price = price;
    this.startTime = startTime;
    this.endTime = endTime;
    this.vehicle = vehicle;
    this.user = user;
    this.payment = payment;
    this.route = route;
  }
}
