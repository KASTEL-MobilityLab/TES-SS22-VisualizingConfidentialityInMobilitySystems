import type { Trip } from "./dataFields/Trip";

export class TripAnimator {
  public static readonly RELOAD_TIME_IN_MILLISECONDS = "25";
  trips: Trip[];
  aniamtionSpeed: number;
  isRunning: boolean;
  //Stores all ids of trips that are currently animated
  activeTrips: string[];

  constructor(trips: Trip[], aniamtionSpeed: number) {
    this.trips = trips;
    this.aniamtionSpeed = aniamtionSpeed;
    this.isRunning = false;
    this.activeTrips = [];
  }

  public start() {
    this.isRunning = true;
    /*
    for (const trip of this.trips) {
      if (!(trip.id in this.activeTrips)) {
        trip.step();
        this.activeTrips.push(trip.id);
      }
    }
*/
    //const trip = this.trips[0];
    for (const trip of this.trips) {
      if (!this.activeTrips.includes(trip.id)) {
        this.activeTrips.push(trip.id);
      }
      setInterval(function () {
        trip.step();
      }, 25);
    }

    /*
    if (trip.route?.waypoints) {
      for (const waypoint of trip.route.waypoints) {
        console.log(waypoint);
      }
    }
    */
  }

  public stop() {
    this.isRunning = false;
  }

  public reset() {
    throw new Error("Method not implemented.");
  }

  public nextStep() {
    if (this.isRunning) {
      for (const trip of this.trips) {
        if (trip.id in this.activeTrips) {
          trip.step();
          if (trip.isFinished()) {
            trip.resetStepCounter();
            trip.nextTrip.step();
          }
        }
      }
    }
  }
}
