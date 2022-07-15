import type { Trip } from "./dataFields";

export class AggregatedData {
  numberOfActiveVehicles: number;
  numberOfUsers: number;

  averageSpeed: number;
  averageDuration: number;
  //To be implemented with the API
  averageDistance: number;
  averagePrice: number;

  constructor(trips: Trip[]) {
    this.numberOfActiveVehicles = 0;
    this.numberOfUsers = 0;

    this.averageSpeed = 0;
    this.averageDuration = 0;
    this.averageDistance = 0;
    this.averagePrice = 0;

    this.init(trips);
  }

  calculateNumberOfActiveVehiles(trips: Trip[]) {
    trips.forEach((trip) => {
      if (trip.vehicle?.status === "Active") {
        this.numberOfActiveVehicles++;
      }
    });
  }

  calculateNumberOfUsers(trips: Trip[]) {
    let userIds: string[];
    trips.forEach((trip) => {
      if (!(trip.userId in userIds)) {
        userIds.push(trip.userId);
        this.numberOfUsers++;
      }
    });
  }

  calculateAverageSpeed(trips: Trip[]) {
    const sumSpeed = trips.reduce((sum, trip) => sum + trip.avgSpeed, 0);
    this.averageSpeed = sumSpeed / trips.length;
  }

  calculateAverageDuration(trips: Trip[]) {
    const sumDuration = trips.reduce(
      (sum, trip) => sum + (trip.endTime.getTime() - trip.startTime.getTime()),
      0
    );
    this.averageSpeed = sumDuration / trips.length;
  }

  calculateAveragePrice(trips: Trip[]) {
    const sumPrice = trips.reduce((sum, trip) => sum + trip.price, 0);
    this.averageSpeed = sumPrice / trips.length;
  }

  /**
   * This method initializes the aggregated data by calculating all data.
   */
  init(trips: Trip[]) {
    this.calculateNumberOfActiveVehiles(trips);
    this.calculateNumberOfUsers(trips);
    this.calculateAverageSpeed(trips);
    this.calculateAverageDuration(trips);
    this.calculateAveragePrice(trips);
  }
}
