import { Payment, Route, type DataField } from "@/backend/dataFields";
import type { VehicleType } from "@/backend/dataFields/types";
import type { LatLng as CustomLatLng } from "@/backend/utils/LatLng";
import { RandomDataGenerator } from "@/backend/utils/RandomDataGenerator";
import { instanceToPlain } from "class-transformer";

/**
 * Prints the specified data to the console in a JSON-Ready format.
 * This is basically a wrapper for the RandomDataGenerator utility.
 */
export class RandomDataPrinter {
  private clickedPositions: CustomLatLng[];

  /**
   * Constructs a new RandomDataPrinter with the specified RandomDataGenerator.
   */
  constructor() {
    this.clickedPositions = [];
  }

  /**
   * Prints the specified data (must extend DataField) to the console in a JSON-Ready format.
   * @param data The Array of instances of a DataField Subclass to print.
   */
  private print<T extends DataField>(data: T[]): void {
    console.log(JSON.stringify(instanceToPlain(data), null, 4));
  }

  /**
   * Prints a number of random users to the console in a JSON-Ready format.
   *
   * @param count The number of random users to generate.
   * @param startId the starting id for the first user.
   */
  printUsers(count: number, startId: number) {
    const randomUsers = RandomDataGenerator.generateUsers(count, startId);
    this.print(randomUsers);
  }

  /**
   * Adds a new waypoint to the current route.
   *
   * @param waypoint The waypoint to add to the current route.
   */
  addWayPointToCurrentRoute(waypoint: CustomLatLng) {
    this.clickedPositions.push(waypoint);
  }

  /**
   * Prints a number of random companies to the console in a JSON-Ready format.
   *
   * @param count The number of random companies to generate.
   * @param startId the starting id for the first company.
   */
  printCompanies(count: number, startId: number) {
    const companies = RandomDataGenerator.generateCompanies(count, startId);
    this.print(companies);
  }

  /**
   * Prints a number of random payments to the console in a JSON-Ready format.
   *
   * @param count The number of random payments to generate.
   * @param startId the starting id for the first payment.
   */
  printPayments(count: number, startId: number, paymentStartId: number) {
    const result = RandomDataGenerator.generatePayments(
      count,
      startId,
      paymentStartId
    );
    for (const obj of result) {
      if (obj instanceof Array) {
        // second case of generatePayments returnType
        this.print(obj as DataField[]);
      } else {
        this.print(result as Payment[]);
        break;
      }
    }
  }

  /**
   * Prints the current route to the console in a JSON-Ready format.
   */
  printCurrentRoute() {
    const len = this.clickedPositions.length;
    if (len > 1) {
      const start = this.clickedPositions[0];
      const end = this.clickedPositions[len - 1];
      const route = new Route("R0X", start, end, this.clickedPositions);
      this.print([route]);
    } else if (len === 1) {
      console.log(JSON.stringify(instanceToPlain(this.clickedPositions[0])));
    }
  }

  /**
   * Prints a number of random routes to the console in a JSON-Ready format.
   *
   * @param startId the Id of the individual route
   */
  printIndividualRoutes(count: number, startId: number) {
    const routes = RandomDataGenerator.generateIndividualRoutes(count, startId);
    this.print(routes);
  }

  printVehicles(
    count: number,
    vehicleStartId: number,
    vehicleType: VehicleType
  ) {
    const vehicles = RandomDataGenerator.generateVehicles(
      vehicleType,
      vehicleStartId,
      count
    );
    this.print(vehicles);
  }
}
