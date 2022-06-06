import { Exclude, Expose, Type } from "class-transformer";
import type { Route } from "../Route";
import { DataField } from "./DataField";
import type { Payment } from "./Payment";
import type { User } from "./User";
import type { Vehicle } from "./Vehicle";

/**
 * The Trip class. Connects User, Vehicle, Payment and Route together.
 */
export class Trip extends DataField {
  @Expose()
  readonly routeId: string;

  @Expose()
  readonly vehicleId: string;

  @Expose()
  readonly userId: string;

  @Expose()
  readonly paymentId: string;

  @Type(() => Number)
  @Expose()
  readonly price: number;

  @Expose()
  readonly startTime: string;

  @Expose()
  readonly endTime: string;

  @Exclude()
  private _vehicle?: Vehicle;

  @Exclude()
  private _user?: User;

  @Exclude()
  private _payment?: Payment;

  @Exclude()
  private _route?: Route;

  constructor(
    id: string,
    routeId: string,
    vehicleId: string,
    userId: string,
    paymentId: string,
    price: number,
    startTime: string,
    endTime: string,
    vehicle?: Vehicle,
    user?: User,
    payment?: Payment,
    route?: Route
  ) {
    super(id);
    this.routeId = routeId;
    this.vehicleId = vehicleId;
    this.userId = userId;
    this.paymentId = paymentId;
    this.price = price;
    this.startTime = startTime;
    this.endTime = endTime;
    if (vehicle !== undefined) {
      this._vehicle = vehicle;
    }
    if (user !== undefined) {
      this._user = user;
    }
    if (payment !== undefined) {
      this._payment = payment;
    }
    if (route !== undefined) {
      this._route = route;
    }
  }

  get vehicle() {
    if (this._vehicle === undefined) {
      throw Error("Vehicle has not been set yet.");
    }
    return this._vehicle;
  }

  set vehicle(vehicle: Vehicle) {
    this.checkForeignKeyReferences(vehicle, this.vehicleId);
    this._vehicle = vehicle;
  }

  get user() {
    if (this._user === undefined) {
      throw Error("User has not been set yet.");
    }
    return this._user;
  }

  set user(user: User) {
    this.checkForeignKeyReferences(user, this.userId);
    this._user = user;
  }

  get payment() {
    if (this._payment === undefined) {
      throw Error("Payment has not been set yet.");
    }
    return this._payment;
  }

  set payment(payment: Payment) {
    this.checkForeignKeyReferences(payment, this.paymentId);
    this._payment = payment;
  }

  get route() {
    if (this._route === undefined) {
      throw Error("Route has not been set yet.");
    }
    return this._route;
  }

  set route(route: Route) {
    this.checkForeignKeyReferences(route, this.routeId);
    this._route = route;
  }
}
