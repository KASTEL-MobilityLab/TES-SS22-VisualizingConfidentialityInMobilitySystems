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
  private static readonly INITIAL_CURRENT_STEP = 0;
  private static readonly REDUCER_FOR_CURRENT_STEP = 1;
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

  /**
   * Creates a new Trip.
   * @param id the id of the trip.
   * @param routeId the id of the route.
   * @param vehicleId the id of the vehicle.
   * @param userId the id of the user.
   * @param paymentId the id of the payment.
   * @param price the price of the trip.
   * @param avgSpeed the average speed of the trip.
   * @param startTime the start time of the trip.
   * @param endTime the end time of the trip.
   * @param vehicle optionally, the vehicle of the trip.
   * @param user optionally, the user of the trip.
   * @param payment optionally, the payment of the trip.
   * @param route optionally, the route of the trip.
   */
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
    if (!vehicle) {
      this._vehicle = vehicle;
    }
    if (!user) {
      this._user = user;
    }
    if (!payment) {
      this._payment = payment;
    }
    if (!route) {
      this._route = route;
    }
  }

  /**
   * Gets the vehicle of the trip.
   */
  get vehicle() {
    return this._vehicle;
  }

  /**
   * Sets the vehicle of the trip and checks for valid foreign key references.
   */
  set vehicle(vehicle: Vehicle | undefined) {
    if (!vehicle) {
      throw new Error("Cannot set the vehicle of this trip to undefined.");
    }
    this.checkForeignKeyReferences(vehicle, this.vehicleId);
    this._vehicle = vehicle;
  }

  /**
   * Gets the user of the trip.
   */
  get user() {
    return this._user;
  }

  /**
   * Checks if the foreign key references are valid and sets the user.
   */
  set user(user: User | undefined) {
    if (!user) {
      throw new Error("Cannot set the user of this trip to undefined.");
    }
    this.checkForeignKeyReferences(user, this.userId);
    this._user = user;
  }

  /**
   * Gets the payment of the trip.
   */
  get payment() {
    return this._payment;
  }

  /**
   * Checks if the foreign key references are valid and sets the payment.
   */
  set payment(payment: Payment | undefined) {
    if (!payment) {
      throw new Error("Cannot set the payment of this trip to undefined.");
    }
    this.checkForeignKeyReferences(payment, this.paymentId);
    this._payment = payment;
  }

  /**
   * Get the route of the trip.
   */
  get route() {
    return this._route;
  }

  /**
   * Checks if the foreign key references are valid and sets the route.
   */
  set route(route: Route | undefined) {
    if (!route) {
      throw new Error("Cannot set the route of this trip to undefined.");
    }
    this.checkForeignKeyReferences(route, this.routeId);
    this._route = route;
  }

  /**
   * Sets the next trip of this trip.
   */
  set nextTrip(nextTrip: Trip) {
    this.nextTrip = nextTrip;
  }

  /**
   * Moves the vehicle to the next waypoint and updates the current step.
   *
   * @param isRunning whether the trip is running or not.
   */
  step(isRunning = true) {
    if (this.route?.waypoints && isRunning && !this.isFinished()) {
      const nextWaypoint = this.route?.waypoints[++this.currentStep];
      this.vehicle?.move(nextWaypoint);
    }
  }

  /**
   * True if the trip is finished.
   *
   * @returns whether the trip is finished or not.
   */
  isFinished(): boolean {
    if (!this.route?.waypoints) {
      throw new Error(
        "Trip Progress is undefined. The Trip does not have a route."
      );
    }
    return (
      this.currentStep ===
      this.route.waypoints.length - Trip.REDUCER_FOR_CURRENT_STEP
    );
  }

  /**
   * Resets the step counter to 0.
   */
  resetStepCounter() {
    this.currentStep = Trip.INITIAL_CURRENT_STEP;
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
}
