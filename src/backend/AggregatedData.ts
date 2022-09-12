import type { Trip } from "./dataFields";

export class AggregatedData {
  public static readonly SECONDS_OF_ONE_MINUTE = 60;
  public static readonly MILLISECONDS_OF_ONE_SECOND = 1000;
  private static readonly INITIAL_AGGREGATED_DATA = 0;

  numberOfActiveVehicles: number;
  numberOfUsers: number;

  averageSpeed: number;
  averageDuration: number;
  //To be implemented with the API
  averageDistance: number;
  averagePrice: number;

  userIds: string[] = [];

  constructor() {
    this.numberOfActiveVehicles = AggregatedData.INITIAL_AGGREGATED_DATA;
    this.numberOfUsers = AggregatedData.INITIAL_AGGREGATED_DATA;

    this.averageSpeed = AggregatedData.INITIAL_AGGREGATED_DATA;
    this.averageDuration = AggregatedData.INITIAL_AGGREGATED_DATA;
    this.averageDistance = AggregatedData.INITIAL_AGGREGATED_DATA;
    this.averagePrice = AggregatedData.INITIAL_AGGREGATED_DATA;
  }

  private calculateNumberOfActiveVehicles(trips: Trip[]) {
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
    const sumSpeed = trips.reduce(
      (sum, trip) => sum + trip.avgSpeed,
      AggregatedData.INITIAL_AGGREGATED_DATA
    );
    this.averageSpeed = sumSpeed / trips.length;
  }

  /**
   * Calculates the average duration in minutes adjusted downward
   */
  private calculateAverageDuration(trips: Trip[]) {
    const sumDuration =
      trips.reduce(
        (sum, trip) => sum + trip.endTime.getTime() - trip.startTime.getTime(),
        AggregatedData.INITIAL_AGGREGATED_DATA
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
    const sumPrice = trips.reduce(
      (sum, trip) => sum + trip.price,
      AggregatedData.INITIAL_AGGREGATED_DATA
    );
    this.averagePrice = Math.floor(sumPrice / trips.length);
  }

  /**
   * This method initializes the aggregated data by calculating all data.
   */
  init(trips: Trip[]) {
    this.calculateNumberOfActiveVehicles(trips);
    this.calculateNumberOfUsers(trips);
    this.calculateAverageSpeed(trips);
    this.calculateAverageDuration(trips);
    this.calculateAveragePrice(trips);
  }
}
