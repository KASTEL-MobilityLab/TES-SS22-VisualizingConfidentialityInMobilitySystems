import { Exclude, Expose, Type } from "class-transformer";
import "reflect-metadata";
import { DataField } from "./DataField";
import type { Payment } from "./Payment";
import type { Route } from "./Route";
import type { User } from "./User";
import type { Vehicle } from "./Vehicle";
import { fetchGeocodingAPI } from "../utils/Routing";
import { isNode } from "browser-or-node";

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

  @Exclude()
  private _nextTrip: Trip | undefined;

  @Exclude()
  currentStep: number;

  @Exclude()
  private startingPoint?: string;

  @Exclude()
  private destination?: string;

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
    this.currentStep = 0;
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
   * Sets the current position of a vehicle to the start of its corresponding route
   */
  setVehicleStartPosition() {
    if (!(this._vehicle && this._route)) {
      throw Error(
        "Vehicle and route must be set before setting start position of a vehicle."
      );
    }
    this._vehicle.currentPosition = this._route.start;
  }

  /**
   * Sets the initial predfined positions of the vehicle and trip.
   */
  async setInitialPositions() {
    if (!(this._vehicle && this._route)) {
      throw Error(
        "Vehicle and route must be set before setting the starting point and destination of a trip."
      );
    }
    //Enter if-statement only in browser
    if (!isNode) {
      await fetchGeocodingAPI(this._route.start).then((value) => {
        this.startingPoint = value;
      });
      await fetchGeocodingAPI(this._route.end).then((value) => {
        this.destination = value;
      });
    }
  }

  get vehicle() {
    return this._vehicle;
  }

  set vehicle(vehicle: Vehicle | undefined) {
    if (!vehicle) {
      throw new Error("Cannot set the vehicle of this trip to undefined.");
    }
    this.checkForeignKeyReferences(vehicle, this.vehicleId);
    this._vehicle = vehicle;
  }

  get user() {
    return this._user;
  }

  set user(user: User | undefined) {
    if (!user) {
      throw new Error("Cannot set the user of this trip to undefined.");
    }
    this.checkForeignKeyReferences(user, this.userId);
    this._user = user;
  }

  get payment() {
    return this._payment;
  }

  set payment(payment: Payment | undefined) {
    if (!payment) {
      throw new Error("Cannot set the payment of this trip to undefined.");
    }
    this.checkForeignKeyReferences(payment, this.paymentId);
    this._payment = payment;
  }

  get route() {
    return this._route;
  }

  set route(route: Route | undefined) {
    if (!route) {
      throw new Error("Cannot set the route of this trip to undefined.");
    }
    this.checkForeignKeyReferences(route, this.routeId);
    this._route = route;
  }

  step(isRunning: boolean) {
    if (this.route?.waypoints && isRunning) {
      const nextWaypoint = this.route?.waypoints[this.currentStep + 1];
      this.vehicle?.move(nextWaypoint);
      this.currentStep++;
    }
  }

  isFinished(): boolean {
    return this.currentStep === this.route?.waypoints?.length;
  }

  resetStepCounter() {
    this.currentStep = 0;
  }

  set nextTrip(nextTrip: Trip) {
    this.nextTrip = nextTrip;
  }
}
