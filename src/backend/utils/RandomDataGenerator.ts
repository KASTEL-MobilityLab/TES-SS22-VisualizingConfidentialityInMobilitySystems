import {
  Cash,
  Company,
  CreditCard,
  DataField,
  EScooter,
  Payment,
  PayPal,
  Route,
  User,
} from "@/backend/dataFields";
import { faker } from "@faker-js/faker";
import { PaymentType, VehicleStatus, VehicleType } from "../dataFields/types";
import { LatLng } from "./LatLng";

/**
 * Returns a random element of the specified Enum.
 *
 * @param enumType The type of the enum to generate a random value for.
 * @returns A random element of the specified Enum.
 */
export function randomEnumElement<T>(enumType: T): T[keyof T] {
  const keys = Object.keys(enumType) as (keyof T)[];
  const randomIndex = Math.floor(Math.random() * keys.length);
  return enumType[keys[randomIndex]];
}

// /**
//  * The Interface for a random data generator function.
//  */
// interface RandomGeneratorFunction<
//   TArgs extends RandomGeneratorFunctionArguments,
//   TReturn extends DataField
// > {
//   (...args: TArgs): TReturn;
// }

// type RandomGeneratorFunctionArguments = [string] | [string, ...unknown[]];

/**
 * Random data generator for DataField classes.
 */
export class RandomDataGenerator {
  static readonly DEFAULT_CENTER_LOCATION: [number, number] = [49.009, 8.4];
  static readonly DEFAULT_LOCALE = "de";

  static {
    faker.setLocale(RandomDataGenerator.DEFAULT_LOCALE);
  }

  // helper function for generating multiple entities
  private static generateMultiple<T extends DataField>(
    generator: (id: string) => T,
    count: number,
    startId: number,
    idPrefix: string
  ): T[] {
    const data: T[] = [];
    for (let i = 0; i < count; i++) {
      const id = `${idPrefix}${startId + i < 10 ? "0" : ""}${startId + i}`;
      const entity: T = generator(id);
      data.push(entity);
    }
    return data;
  }

  // User data generation -------------------------------------------------------

  /**
   * Generates a random user.
   *
   * @param id the user Id in the form of U{number}
   * @returns a randomly generated user
   */
  static generateUser(id: string) {
    const forename = faker.name.firstName();
    const surname = faker.name.lastName();
    const email = faker.internet.email();
    const phoneNumber = parseInt(faker.phone.number("49########"));
    return new User(id, forename, surname, phoneNumber, email);
  }

  /**
   * Generates random users.
   *
   * @param count the number of users to generate
   * @param startId the start id of the first user
   * @returns an array of randomly generated users
   */
  static generateUsers(count: number, startId: number): User[] {
    return this.generateMultiple(this.generateUser, count, startId, "U");
  }

  // Payment data generation -----------------------------------------------------

  /**
   * Generates a random payment.
   *
   * @param id the id of the payment
   * @returns a random payment
   */
  static generatePayment(id: string): Payment {
    const paymentType = randomEnumElement(PaymentType);
    // assume trip ID is the same as payment ID
    const tripId = id.replace("P", "T");
    switch (paymentType) {
      case PaymentType.Cash:
        return new Cash(id, tripId);
      case PaymentType.CreditCard:
        return RandomDataGenerator.generateCreditCardPayment(id, tripId);
      case PaymentType.PayPal:
        return RandomDataGenerator.generatePayPalPayment(id, tripId);
      default:
        throw new Error(`Unknown payment type: ${paymentType}`);
    }
  }

  /**
   * Generates random Payments.
   *
   * @param count the number of payments to generate
   * @param startId the start id of the first payment
   * @returns an array of randomly generated payments
   */
  static generatePayments(count: number, startId: number): Payment[] {
    return RandomDataGenerator.generateMultiple(
      RandomDataGenerator.generatePayment,
      count,
      startId,
      "P"
    );
  }

  private static generateCreditCardPayment(
    id: string,
    tripId: string
  ): CreditCard {
    const provider = faker.finance.creditCardIssuer();
    const cardNumber = parseInt(faker.finance.creditCardNumber(provider));
    const ccv = parseInt(faker.finance.creditCardCVV());
    const expiryDate = faker.date.future(10);
    return new CreditCard(cardNumber, ccv, expiryDate, provider, id, tripId);
  }

  private static generatePayPalPayment(
    id: string,
    tripId: string,
    user?: User
  ): PayPal {
    // we can give this function a first and last name, but currently,
    // we cannot link the payment to a user, maybe we generate those
    // together later on.
    const userName = faker.internet.userName(user?.forename, user?.surname);
    return new PayPal(userName, id, tripId);
  }

  // Route data generation -------------------------------------------------------

  /**
   * Generates random individual routes.
   *
   * @param count the number of individual routes to generate
   * @param startId the start id of the first individual route
   * @returns an array of randomly generated individual routes
   */
  static generateIndividualRoutes(count: number, startId: number): Route[] {
    return RandomDataGenerator.generateMultiple(
      RandomDataGenerator.generateIndividualRoute,
      count,
      startId,
      "R"
    );
  }

  /**
   * Generates a random route.
   *
   * @param id the id of the route
   * @param radius the radius of the route from the center location in meters
   * @param centerLocation the center location (start location of the route)
   * @returns a random individual route
   */
  static generateIndividualRoute(
    id: string,
    radius = 1000,
    centerLocation: [
      number,
      number
    ] = RandomDataGenerator.DEFAULT_CENTER_LOCATION
  ) {
    const start = faker.address
      .nearbyGPSCoordinate(centerLocation, radius, true)
      .map(parseFloat) as [number, number];
    const end = faker.address
      .nearbyGPSCoordinate(start, radius, true)
      .map(parseFloat) as [number, number];
    return new Route(
      id,
      new LatLng(start[0], start[1]),
      new LatLng(end[0], end[1])
    );
  }

  // Company data generation -----------------------------------------------------

  /**
   * Generates a random company.
   */
  static generateCompany(id: string) {
    const name = faker.company.name();
    return new Company(id, name);
  }

  /**
   * Generates random companies.
   *
   * @param count the number of companies to generate
   * @param startId the start id of the first company
   * @returns an array of randomly generated companies
   */
  static generateCompanies(count: number, startId: number): Company[] {
    return RandomDataGenerator.generateMultiple(
      RandomDataGenerator.generateCompany,
      count,
      startId,
      "C"
    );
  }

  /**
   * Generates vehicles for a company. The company Id must be set manually because it is read-only.
   *
   * @param vehicleType the type of vehicle
   * @returns a random vehicle
   */
  static generateVehicles(
    vehicleType: VehicleType,
    vehicleStartId: number,
    numVehicles: number
  ) {
    switch (vehicleType) {
      case VehicleType.EScooter:
        return RandomDataGenerator.generateMultiple(
          this.generateEScooterVehicle,
          numVehicles,
          vehicleStartId,
          "V"
        );
      case VehicleType.train:
        throw new Error("not implemented");
      case VehicleType.bus:
        throw new Error("not implemented");
      default:
        throw new Error(`Unknown vehicle type: ${vehicleType}`);
    }
  }

  private static generateEScooterVehicle(id: string) {
    const condition = Math.floor(Math.random() * 100);
    const batteryCondition = Math.floor(Math.random() * 100);
    const status = randomEnumElement(VehicleStatus);
    const batteryLevel = Math.floor(Math.random() * 100);
    return new EScooter(
      id,
      "to_be_replaced",
      condition,
      batteryCondition,
      status,
      batteryLevel
    );
  }
}
