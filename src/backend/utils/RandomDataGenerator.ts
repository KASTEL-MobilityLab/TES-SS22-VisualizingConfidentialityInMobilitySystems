import {
  Cash,
  Company,
  CreditCard,
  DataField,
  Payment,
  Route,
  User,
  Vehicle,
} from "@/backend/dataFields";
import { faker } from "@faker-js/faker";
import { PaymentType, VehicleType } from "../dataFields/types";
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

  /**
   * Constructs a new Random Data Generator.
   *
   * @param locale The locale to use for the random data.
   */
  constructor(locale = RandomDataGenerator.DEFAULT_LOCALE) {
    faker.setLocale(locale);
  }

  // helper function for generating multiple entities
  private generateMultiple<T extends DataField>(
    generator: (id: string) => T,
    count: number,
    startId: number,
    idPrefix: string
  ): T[] {
    const data: T[] = [];
    for (let i = 0; i < count; i++) {
      const id = `${idPrefix}${startId + i < 10 ? "0" : ""}${startId + i}`;
      data.push(generator(id));
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
  generateUser(id: string) {
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
  generateUsers(count: number, startId: number): User[] {
    return this.generateMultiple(this.generateUser, count, startId, "U");
  }

  // Payment data generation -----------------------------------------------------

  /**
   * Generates a random payment.
   *
   * @param id the id of the payment
   * @returns a random payment
   */
  generatePayment(id: string): Payment {
    const paymentType = randomEnumElement(PaymentType);
    const tripId = id;
    switch (paymentType) {
      case PaymentType.Cash:
        return new Cash(id, tripId);
      case PaymentType.CreditCard:
        return this.generateCreditCardPayment(id);
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
  generatePayments(count: number, startId: number): Payment[] {
    return this.generateMultiple(this.generatePayment, count, startId, "P");
  }

  private generateCreditCardPayment(id: string): CreditCard {
    const cardNumber = parseInt(faker.finance.creditCardNumber());
    const ccv = parseInt(faker.finance.creditCardCVV());
    const expiryDate = faker.date.future(10);
    const provider = faker.finance.creditCardIssuer();
    return new CreditCard(cardNumber, ccv, expiryDate, provider, id, id);
  }

  // Route data generation -------------------------------------------------------

  /**
   * Generates random individual routes.
   *
   * @param count the number of individual routes to generate
   * @param startId the start id of the first individual route
   * @returns an array of randomly generated individual routes
   */
  generateIndividualRoutes(count: number, startId: number): Route[] {
    return this.generateMultiple(
      this.generateIndividualRoute,
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
  generateIndividualRoute(
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
  generateCompany(id: string) {
    const name = faker.company.name();
    return new Company(id, name);
  }
}
