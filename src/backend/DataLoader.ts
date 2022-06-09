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
import { PaymentType, VehicleType } from "./dataFields/types";
import { Route } from "./Route";

/**
 * Specifies, which data can be loaded with the function {@link getData}.
 */
export enum AvailableData {
  companies = "companies",
  users = "users",
  vehicles = "vehicles",
  payments = "payments",
  routes = "routes",
}

/**
 * Dynamically import the specified json file. Valid strings are specified in the {@link AvailableData} enum.
 * @param fileName A string that specifies the filename, i.e for src/data/companies.json `fileName='companies'`
 * or `fileName='AvailableData.companies'".
 * @returns a Promise of Record<string, unknown>
 */
export async function getData(
  fileName: string
): Promise<Record<string, unknown>[]> {
  if (!(fileName in AvailableData)) {
    throw Error(`Could not import data from src/data/${fileName}.json`);
  }
  try {
    //Get routes data
    if (fileName === "routes") {
      const data = await import(`../data/risk/${fileName}.json`);
      return data.default;
    } else {
      const data = await import(`../data/${fileName}.json`);
      return data.default;
    }
  } catch (error) {
    throw Error(`Unexpected error parsing the JSON file: ${error}`);
  }
}

/**
 * The DataLoader takes care of loading local JSON files and transforms them to their corresponding classes.
 */
export class DataLoader {
  /**
   * Loads all data from the specific company json file and transforms the array of data to an array of companies.
   *
   * @returns an array of {@link Company}
   */
  async loadAllCompanies(): Promise<Company[]> {
    const companyJson = await getData("companies");
    const transformedCompanyData: Company[] = plainToInstance(
      Company,
      companyJson
    );
    return transformedCompanyData;
  }

  /**
   * Loads all data from the specific User json file and transforms the array of data to an array of users.
   *
   * @returns an array of {@link User}
   */
  async loadAllUsers(): Promise<User[]> {
    const userJson = await getData("users");
    const transformedUserData: User[] = plainToInstance(User, userJson);
    return transformedUserData;
  }

  /**
   * Loads all data from the specific vehicle json file and transforms the array of data to an array of vehicles.
   *
   * @returns an array of {@link Vehicle}s
   */
  async loadAllVehicles(): Promise<Vehicle[]> {
    const vehicleJson = await getData("vehicles");
    const transformedVehicleData: Vehicle[] = [];

    //Filter the e-scooters from all vehicles
    const escooters = plainToInstance(EScooter, vehicleJson, {
      excludeExtraneousValues: true,
    }).filter((vehicle) => vehicle.type === VehicleType.escooter);

    //Push all e-scooters
    transformedVehicleData.push(...escooters);

    //Filter the trains from all vehicles
    const trains = plainToInstance(Train, vehicleJson, {
      excludeExtraneousValues: true,
    }).filter((vehicle) => vehicle.type === VehicleType.train);

    //Push all trains
    transformedVehicleData.push(...trains);

    return transformedVehicleData;
  }

  /**
   * Loads all data from the specific payment json file and transforms the array of data to an array of payments.
   *
   * @returns an array of {@link Payment}s
   */
  async loadAllPayments(): Promise<Payment[]> {
    const paymentJson = await getData("payments");
    const transformedPaymentData: Payment[] = [];

    //Filter the cash payments from all payments
    const cashPayments = plainToInstance(Cash, paymentJson, {
      excludeExtraneousValues: true,
    }).filter((payment) => payment.paymentType === PaymentType.cash);

    //Push all cash payments
    transformedPaymentData.push(...cashPayments);

    //Filter the credit card payments from all payments
    const creditCardPayments = plainToInstance(CreditCard, paymentJson, {
      excludeExtraneousValues: true,
    }).filter((payment) => payment.paymentType === PaymentType.creditcard);

    //Push all credit card payments
    transformedPaymentData.push(...creditCardPayments);

    //Filter the PayPal payments from all payments
    const payPalPayments = plainToInstance(PayPal, paymentJson, {
      excludeExtraneousValues: true,
    }).filter((payment) => payment.paymentType === PaymentType.paypal);

    //Push all PayPal payments
    transformedPaymentData.push(...payPalPayments);

    return transformedPaymentData;
  }

  /**
   * Loads all data from the specific trip json file and transforms the array of data to an array of trips.
   *
   * @returns an array of {@link Trip}
   */
  async loadAllTrips(): Promise<Trip[]> {
    const tripJson = await getData("trips");
    const transformedTripData: Trip[] = plainToInstance(Trip, tripJson);
    return transformedTripData;
  }

  /**
   * Loads all data from the specific route json file and transforms the array of data to an array of routes.
   *
   * @returns an array of {@link Route}
   */
  async loadAllRoutes(): Promise<Route[]> {
    const routeJson = await getData("routes");
    const transformedRouteData: Route[] = plainToInstance(Route, routeJson);
    return transformedRouteData;
  }
}
