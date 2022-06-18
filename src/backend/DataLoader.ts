import {
  Company,
  CreditCard,
  EScooter,
  Train,
  Trip,
  User,
  Vehicle,
  type Payment,
} from "@/backend/dataFields";
import { Cash } from "@/backend/dataFields/payments/Cash";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";
import { PayPal } from "./dataFields/payments/Paypal";
import { Route } from "./dataFields/Route";
import { PaymentType, VehicleType } from "./dataFields/types";

/**
 * Specifies, which data can be loaded with the function {@link getData}.
 */
export enum AvailableData {
  companies = "companies",
  users = "users",
  vehicles = "vehicles",
  payments = "payments",
  routes = "routes",
  trips = "trips",
  risks = "risk/risk",
  explanation = "risk/explanation",
}

/**
 * Dynamically import the specified json file. Valid strings are specified in the {@link AvailableData} enum.
 * @param dataPath A string that specifies the filename, i.e for src/data/companies.json `fileName='companies'`
 * or `fileName='AvailableData.companies'".
 * @returns a Promise of Record<string, unknown>
 */
export async function getData(
  dataPath: AvailableData
): Promise<Record<string, unknown>[]> {
  try {
    const data = await import(`../data/${dataPath}.json`);
    return data.default;
  } catch (error) {
    throw Error(`Unexpected error parsing the JSON file: ${error}`);
  }
}

/**
 * The DataLoader takes care of loading local JSON files and transforms them to their corresponding classes.
 */
export class DataLoader {
  private static classTransformerOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    excludePrefixes: ["_"],
  };
  /**
   * Loads all data from the specific company json file and transforms the array of data to an array of companies.
   *
   * @returns an array of {@link Company}
   */
  static async loadAllCompanies(): Promise<Company[]> {
    const companyJson = await getData(AvailableData.companies);
    const transformedCompanyData: Company[] = plainToInstance(
      Company,
      companyJson,
      this.classTransformerOptions
    );
    return transformedCompanyData;
  }

  /**
   * Loads all data from the specific User json file and transforms the array of data to an array of users.
   *
   * @returns an array of {@link User}
   */
  static async loadAllUsers(): Promise<User[]> {
    const userJson = await getData(AvailableData.users);
    const transformedUserData: User[] = plainToInstance(
      User,
      userJson,
      this.classTransformerOptions
    );
    return transformedUserData;
  }

  /**
   * Loads all data from the specific vehicle json file and transforms the array of data to an array of vehicles.
   *
   * @returns an array of {@link Vehicle}s
   */
  static async loadAllVehicles(): Promise<Vehicle[]> {
    const vehicleJson = await getData(AvailableData.vehicles);
    const transformedVehicleData: Vehicle[] = [];

    //Filter the e-scooters from all vehicles
    const escooters = plainToInstance(
      EScooter,
      vehicleJson,
      this.classTransformerOptions
    ).filter((vehicle) => vehicle.type === VehicleType.escooter);

    //Push all e-scooters
    transformedVehicleData.push(...escooters);

    //Filter the trains from all vehicles
    const trains = plainToInstance(
      Train,
      vehicleJson,
      this.classTransformerOptions
    ).filter((vehicle) => vehicle.type === VehicleType.train);

    //Push all trains
    transformedVehicleData.push(...trains);

    return transformedVehicleData;
  }

  /**
   * Loads all data from the specific payment json file and transforms the array of data to an array of payments.
   *
   * @returns an array of {@link Payment}s
   */
  static async loadAllPayments(): Promise<Payment[]> {
    const paymentJson = await getData(AvailableData.payments);
    const transformedPaymentData: Payment[] = [];

    //Filter the cash payments from all payments
    const cashPayments = plainToInstance(
      Cash,
      paymentJson,
      this.classTransformerOptions
    ).filter((payment) => payment.paymentType === PaymentType.cash);

    //Push all cash payments
    transformedPaymentData.push(...cashPayments);

    //Filter the credit card payments from all payments
    const creditCardPayments = plainToInstance(
      CreditCard,
      paymentJson,
      this.classTransformerOptions
    ).filter((payment) => payment.paymentType === PaymentType.creditcard);

    //Push all credit card payments
    transformedPaymentData.push(...creditCardPayments);

    //Filter the PayPal payments from all payments
    const payPalPayments = plainToInstance(
      PayPal,
      paymentJson,
      this.classTransformerOptions
    ).filter((payment) => payment.paymentType === PaymentType.paypal);

    //Push all PayPal payments
    transformedPaymentData.push(...payPalPayments);

    return transformedPaymentData;
  }

  /**
   * Loads all data from the specific trip json file and transforms the array of data to an array of trips.
   *
   * @returns an array of {@link Trip}
   */
  static async loadAllTrips(): Promise<Trip[]> {
    const tripJson = await getData(AvailableData.trips);
    const transformedTripData: Trip[] = plainToInstance(
      Trip,
      tripJson,
      this.classTransformerOptions
    );
    return transformedTripData;
  }

  /**
   * Loads all data from the specific route json file and transforms the array of data to an array of routes.
   *
   * @returns an array of {@link Route}
   */
  static async loadAllRoutes(): Promise<Route[]> {
    const routeJson = await getData(AvailableData.routes);
    const transformedRouteData: Route[] = plainToInstance(
      Route,
      routeJson,
      this.classTransformerOptions
    );
    return transformedRouteData;
  }

  // static async loadAllRisks(): Promise<RiskDefinition[]> {
  //   const riskJson = await getData(AvailableData.risks);
  //   const transformedRiskData: RiskDefinition[] = plainToInstance(
  //     RiskDefinition,
  //     riskJson,
  //     this.classTransformerOptions
  //   );
  //   return transformedRiskData;
  // }
}
