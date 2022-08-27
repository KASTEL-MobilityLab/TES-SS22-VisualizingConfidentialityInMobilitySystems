import {
  Cash,
  Company,
  CreditCard,
  DataField,
  Payment,
  Route,
  User,
} from "@/backend/dataFields";
import { faker } from "@faker-js/faker";
import { PaymentType } from "../dataFields/types";
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

  static generateCreditCardPayment(id: string, tripId: string): CreditCard {
    const cardNumber = parseInt(faker.finance.creditCardNumber());
    const ccv = parseInt(faker.finance.creditCardCVV());
    const expiryDate = faker.date.future(10);
    const provider = faker.finance.creditCardIssuer();
    return new CreditCard(cardNumber, ccv, expiryDate, provider, id, tripId);
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

  // Vehicle data generation --------------------------------------------------------
  /**
   * Generates a random vehicle.
   *
   * @param id the id of the vehicle
   * @returns a random vehicle
   */
  // static generateVehicle(id: string): Vehicle {
  //   const name = faker.name.firstName();
  //   const type = randomEnumElement(VehicleType);
  //   switch (type) {
  //     case VehicleType.Bike:
  //       return this.generate
  //     case VehicleType.EScooter:
  //       return;
  //     case VehicleType.train:
  //       return;
  //     case VehicleType.bus:
  //       return;
  //     default:
  //       throw new Error(`Unknown vehicle type: ${type}`);
  // }

  // private static generateBikeVehicle(id: string): Bike {
  // }

  // private static generateEScooterVehicle(id: string): EScooter {
  // }

  // private static generate
}
