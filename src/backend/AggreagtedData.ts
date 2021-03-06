import type { Trip } from "./dataFields";

export class AggregatedData {
  public static readonly SECONDS_OF_ONE_MINUTE = 60;
  public static readonly MILLISECONDS_OF_ONE_SECOND = 1000;

  numberOfActiveVehicles: number;
  numberOfUsers: number;

  averageSpeed: number;
  averageDuration: number;
  //To be implemented with the API
  averageDistance: number;
  averagePrice: number;

  userIds: string[] = [];

  constructor() {
    this.numberOfActiveVehicles = 0;
    this.numberOfUsers = 0;

    this.averageSpeed = 0;
    this.averageDuration = 0;
    this.averageDistance = 0;
    this.averagePrice = 0;
  }

  private calculateNumberOfActiveVehiles(trips: Trip[]) {
    trips.forEach((trip) => {
      if (trip.vehicle?.isActive()) {
        this.numberOfActiveVehicles++;
      }
    });
  }

  private calculateNumberOfUsers(trips: Trip[]) {
    trips.forEach((trip) => {
      if (!(trip.userId in this.userIds)) {
        this.userIds.push(trip.userId);
        this.numberOfUsers++;
      }
    });
  }

  private calculateAverageSpeed(trips: Trip[]) {
    const sumSpeed = trips.reduce((sum, trip) => sum + trip.avgSpeed, 0);
    this.averageSpeed = sumSpeed / trips.length;
  }

  /**
   * Calculates the average duration in minutes adjusted downward
   */
  private calculateAverageDuration(trips: Trip[]) {
    const sumDuration =
      trips.reduce(
        (sum, trip) => sum + trip.endTime.getTime() - trip.startTime.getTime(),
        0
      ) / AggregatedData.MILLISECONDS_OF_ONE_SECOND;
    this.averageDuration = sumDuration / trips.length;
    this.averageDuration = Math.floor(
      this.averageDuration / AggregatedData.SECONDS_OF_ONE_MINUTE
    );
  }

  /**
   * Calculates the average price in Euro adjusted downward
   */
  private calculateAveragePrice(trips: Trip[]) {
    const sumPrice = trips.reduce((sum, trip) => sum + trip.price, 0);
    this.averagePrice = Math.floor(sumPrice / trips.length);
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
