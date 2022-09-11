import type { Trip } from "./dataFields/Trip";

/**
 * The TripAnimator. Manages the animation of the trips.
 */
export class TripAnimator {
  trips: Trip[];
  animationSpeed: number;
  isRunning: boolean;
  // Stores all ids of trips that are currently animated
  // Note: This is only needed, when we implement the loops of trips, but
  // we did not have time to implement this. Therefore, this is not used.
  activeTrips: string[];
  intervalID?: NodeJS.Timer;

  /**
   * Creates a new TripAnimator.
   *
   * @param trips The trips that should be animated.
   * @param animationSpeed the speed of the animation.
   */
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
    clearInterval(this.intervalID);
    this.activeTrips = [];
    for (const trip of this.trips) {
      trip.setVehicleStartPosition();
      trip.resetStepCounter();
    }
  }
}
