import type { Trip } from "./dataFields/Trip";

export class TripAnimator {
  public static readonly RELOAD_TIME_IN_MILLISECONDS = "25";
  trips: Trip[];
  animationSpeed: number;
  isRunning: boolean;
  //Stores all ids of trips that are currently animated
  activeTrips: string[];
  intervalID: unknown;

  constructor(trips: Trip[], animationSpeed: number) {
    this.trips = trips;
    this.animationSpeed = animationSpeed;
    this.isRunning = false;
    this.activeTrips = [];
  }

  /**
   * Starts the animation of the vehicles.
   */
  public start() {
    this.isRunning = true;
    for (const trip of this.trips) {
      if (!this.activeTrips.includes(trip.id)) {
        this.activeTrips.push(trip.id);
      }
    }
    if (!this.intervalID) {
      for (const trip of this.trips) {
        this.intervalID = setInterval(() => {
          trip.step(this.isRunning);
        }, this.animationSpeed);
      }
    }
  }

  /**
   * Pauses the animation of the vehicles.
   */
  public stop() {
    this.isRunning = false;
  }

  /**
   * Resets the animation by moving the vehicles back to the starting positions.
   */
  public reset() {
    this.isRunning = false;
    for (const trip of this.trips) {
      trip.setVehicleStartPosition();
      trip.resetStepCounter();
    }
  }
}
