import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { DataField } from "./DataField";
import type { Payment } from "./Payment";
import type { Route } from "./Route";
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

  @Expose()
  readonly price: number;

  @Type(() => Date)
  @Expose()
  readonly startTime: Date;

  @Type(() => Date)
  @Expose()
  readonly endTime: Date;

  @Expose()
  readonly avgSpeed: number;

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
    avgSpeed: number,
    startTime: Date,
    endTime: Date,
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
    this.avgSpeed = avgSpeed;
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

  /**
   * Sets the current position of the vehicle to the start of this trip.
   */
  setVehicleStartPosition() {
    if (!(this._vehicle && this._route)) {
      throw Error(
        "Vehicle and route must be set before setting start position of a vehicle."
      );
    }
    this._vehicle.currentPosition = this._route.start;
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
