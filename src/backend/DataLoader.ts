import {
  Cash,
  Company,
  CreditCard,
  EScooter,
  PayPal,
  Route,
  Train,
  Trip,
  User,
  Vehicle,
  type Payment,
} from "@/backend/dataFields";
import { isNode } from "browser-or-node";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";
import { PaymentType, VehicleType } from "./dataFields/types";
import { RiskDefinition } from "./riskManager/RiskDefinition";

const DataPath = "data/";
const TestDataPath = "backend/__tests__/data/";

/**
 * Specifies, which data can be loaded with the function {@link getData}.
 */
export const AvailableData = {
  companies: DataPath + "companies",
  users: DataPath + "users",
  vehicles: DataPath + "vehicles",
  payments: DataPath + "payments",
  routes: DataPath + "routes",
  trips: DataPath + "trips",
  risks: DataPath + "risk/risk",
  explanation: DataPath + "risk/explanation",
  testCompanies: TestDataPath + "companies",
  testUsers: TestDataPath + "users",
  testVehicles: TestDataPath + "vehicles",
  testPayments: TestDataPath + "payments",
  testRoutes: TestDataPath + "routes",
  testTrips: TestDataPath + "trips",
  testRisks: TestDataPath + "risk",
};

/**
 * Asynchronously fetches the specified json file. Possible Paths are specified in the {@link AvailableData} object.
 *
 * @param dataPath A string that specifies the filename relative to the root folder.
 * @returns a Promise of Record<string, unknown>
 */
export async function getData(
  dataPath: string
): Promise<Record<string, unknown>[]> {
  try {
    if (isNode) {
      const data = await import(`./src/${dataPath}.json`);
      return data.default;
    } else {
      // anything inside public will be into the root of dist
      const url = `${dataPath}.json`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          "Fetching JSON failed with error: " + response.statusText
        );
      }
      return await response.json();
    }
  } catch (error) {
    throw new Error(`Unexpected error parsing the JSON file: ${error}`);
  }
}

export interface DataLoaderParams {
  companyPath?: string;
  userPath?: string;
  vehiclePath?: string;
  paymentPath?: string;
  routePath?: string;
  tripPath?: string;
  riskPath?: string;
}

/**
 * The DataLoader takes care of loading local JSON files and transforms them to their corresponding classes.
 */
export class DataLoader {
  private companyPath: string;
  private userPath: string;
  private vehiclePath: string;
  private routePath: string;
  private tripPath: string;
  private riskPath: string;
  private paymentPath: string;

  private classTransformerOptions = {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
    excludePrefixes: ["_"],
  };

  /**
   * Constructs a data loader instance with the specified paths.
   *
   * @param paths Optional. An object that specifies the paths to the json files that should be loaded.
   */
  constructor({
    companyPath = AvailableData.companies,
    userPath = AvailableData.users,
    vehiclePath = AvailableData.vehicles,
    routePath = AvailableData.routes,
    tripPath = AvailableData.trips,
    riskPath = AvailableData.risks,
    paymentPath = AvailableData.payments,
  }: DataLoaderParams) {
    this.companyPath = companyPath;
    this.userPath = userPath;
    this.vehiclePath = vehiclePath;
    this.routePath = routePath;
    this.tripPath = tripPath;
    this.riskPath = riskPath;
    this.paymentPath = paymentPath;
  }

  /**
   * Loads all data from the specific company json file and transforms the array of data to an array of companies.
   *
   * @returns an array of {@link Company}
   */
  async loadAllCompanies(): Promise<Company[]> {
    const companyJson = await getData(this.companyPath);
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
  async loadAllUsers(): Promise<User[]> {
    const userJson = await getData(this.userPath);
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
  async loadAllVehicles(): Promise<Vehicle[]> {
    const vehicleJson = await getData(this.vehiclePath);
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
  async loadAllPayments(): Promise<Payment[]> {
    const paymentJson = await getData(this.paymentPath);
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
  async loadAllTrips(): Promise<Trip[]> {
    const tripJson = await getData(this.tripPath);
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
  async loadAllRoutes(): Promise<Route[]> {
    const routeJson = await getData(this.routePath);
    const transformedRouteData: Route[] = plainToInstance(
      Route,
      routeJson,
      this.classTransformerOptions
    );
    return transformedRouteData;
  }

  async loadAllRisks(): Promise<RiskDefinition[]> {
    const riskJson = await getData(this.riskPath);
    const transformedRiskData: RiskDefinition[] = plainToInstance(
      RiskDefinition,
      riskJson,
      this.classTransformerOptions
    );
    return transformedRiskData;
  }
}
