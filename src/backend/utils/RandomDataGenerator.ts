import {
  Cash,
  Company,
  CreditCard,
  DataField,
  EScooter,
  Payment,
  PayPal,
  Route,
  Train,
  User,
  Vehicle,
} from "@/backend/dataFields";
import { faker } from "@faker-js/faker";
import {
  PaymentType,
  VehicleStatus,
  VehicleType,
  type LicensePlate,
} from "../dataFields/types";
import { Bicycle } from "../dataFields/vehicles/Bicycle";
import { SharedCar } from "../dataFields/vehicles/SharedCar";
import { Taxi } from "../dataFields/vehicles/Taxi";
import { LatLng } from "./LatLng";

/**
 * Returns a random element of the specified Enum.
 *
 * @param enumType The type of the enum to generate a random value for.
 * @returns A random element of the specified Enum.
 */
export function randomEnumElement<T extends Record<string, unknown>>(
  enumType: T
): T[keyof T] {
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
      const id = RandomDataGenerator.getIdString(idPrefix, startId + i);
      const entity: T = generator(id);
      data.push(entity);
    }
    return data;
  }

  private static getIdString(idPrefix: string, id: number) {
    return `${idPrefix}${id < 10 ? "0" : ""}${id}`;
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
    const email = faker.internet.email(forename, surname);
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
  static generatePayment(id: string, user?: User): Payment {
    const paymentType = randomEnumElement(PaymentType);
    // assume trip ID is the same as payment ID
    const tripId = id.replace("P", "T");
    switch (paymentType) {
      case PaymentType.Cash:
        return new Cash(id, tripId);
      case PaymentType.CreditCard:
        return RandomDataGenerator.generateCreditCardPayment(id, tripId);
      case PaymentType.PayPal:
        return RandomDataGenerator.generatePayPalPayment(id, tripId, user);
      default:
        throw new Error(`Unknown payment type: ${paymentType}`);
    }
  }

  /**
   * Generates random Payments and optionally users for these payments. These are connected because Payments like
   * Paypal can generate the PayPal Username with the users real name. Otherwise, those usernames are completely random.
   *
   * @param count the number of payments to generate
   * @param startId the start id of the first payment
   * @param userStartId optional, if given generate users for the payments
   * @returns an array of randomly generated payments (and possibly users for the payments)
   */
  static generatePayments(
    count: number,
    startId: number,
    userStartId?: number
  ): Payment[] | [Payment[], User[]] {
    const payments = [];
    if (userStartId) {
      const users = this.generateUsers(count, userStartId);
      for (const user of users) {
        const paymentId = RandomDataGenerator.getIdString("P", startId++);
        payments.push(this.generatePayment(paymentId, user));
      }
      return [payments, users];
    }
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
    const start = RandomDataGenerator.generateRandomLatLng(
      centerLocation,
      radius
    );
    const end = RandomDataGenerator.generateRandomLatLng(
      [start.latitude, start.longitude],
      radius
    );
    return new Route(id, start, end);
  }

  private static generateRandomLatLng(
    centerLocation: [
      number,
      number
    ] = RandomDataGenerator.DEFAULT_CENTER_LOCATION,
    radius = 1000
  ): LatLng {
    const latLng = faker.address
      .nearbyGPSCoordinate(centerLocation, radius, true)
      .map(parseFloat) as [number, number];
    return new LatLng(latLng[0], latLng[1]);
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
   * @param vehicleStartId the start id of the first vehicle
   * @param count the number of vehicles to generate
   * @param vehicleType the type of vehicle optionally. If not given, a random type is chosen
   * @returns a random vehicle
   */
  static generateVehicles(
    vehicleStartId: number,
    count: number,
    vehicleType?: VehicleType
  ) {
    let generator: (id: string) => Vehicle;
    if (!vehicleType) {
      vehicleType = randomEnumElement(VehicleType);
    }
    switch (vehicleType) {
      case VehicleType.EScooter:
        return RandomDataGenerator.generateMultiple(
          this.generateEScooterVehicle,
          count,
          vehicleStartId,
          "V"
        );
      case VehicleType.Train:
        generator = RandomDataGenerator.generateTrainVehicle;
        break;
      case VehicleType.Bus:
        //generator = RandomDataGenerator.generateBusVehicle;
        //break;
        throw new Error("Bus vehicles are not supported yet");
      case VehicleType.Bike:
        generator = RandomDataGenerator.generateBikeVehicle;
        break;
      case VehicleType.SharedCar:
        generator = RandomDataGenerator.generateSharedCarVehicle;
        break;
      case VehicleType.Taxi:
        generator = RandomDataGenerator.generateTaxiVehicle;
        break;
      default:
        throw new Error(`Unknown vehicle type: ${vehicleType}`);
    }
    return RandomDataGenerator.generateMultiple(
      generator,
      count,
      vehicleStartId,
      "V"
    );
  }

  private static generateBaseVehicleAttributes(): [
    VehicleStatus,
    LatLng | undefined
  ] {
    const status = randomEnumElement(VehicleStatus);
    let currentPosition;
    if (status === VehicleStatus.Inactive) {
      currentPosition = RandomDataGenerator.generateRandomLatLng();
    }
    return [status, currentPosition];
  }

  private static generateEScooterVehicle(id: string) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const condition = faker.datatype.number({ min: 0, max: 100 });
    const batteryCondition = faker.datatype.number({ min: 0, max: 100 });
    const batteryLevel = faker.datatype.number({ min: 0, max: 100 });
    const escooter = new EScooter(
      id,
      "to_be_replaced",
      condition,
      batteryCondition,
      status,
      batteryLevel
    );
    escooter.currentPosition = currentPosition;
    return escooter;
  }
  private static generateTrainVehicle(id: string) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const train = new Train(id, "to_be_replaced", status);
    train.currentPosition = currentPosition;
    return train;
  }
  // private static generateBusVehicle(id: string) {
  //   const [status, currentPosition] =
  //     RandomDataGenerator.generateBaseVehicleAttributes();
  //   //const bus = new Bus(id, "to_be_replaced", status);
  //   throw new Error("Bus class not implemented");
  // }
  private static generateBikeVehicle(id: string) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const electric = faker.datatype.boolean();
    const electricLock = faker.datatype.boolean();
    const bike = new Bicycle(
      id,
      "to_be_replaced",
      status,
      electric,
      electricLock
    );
    bike.currentPosition = currentPosition;
    return bike;
  }
  private static generateRandomLicensePlate(): LicensePlate {
    const number = faker.random.numeric(4);
    const alphas = faker.random.alpha({ count: 2, casing: "upper" });
    return `KA-${alphas}-${number}` as LicensePlate;
  }
  private static generateSharedCarVehicle(id: string) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const numPassengers = faker.datatype.number({ min: 2, max: 7 });
    const licensePlate = RandomDataGenerator.generateRandomLicensePlate();
    const color = faker.color.human();
    const sharedCar = new SharedCar(
      id,
      "to_be_replaced",
      status,
      numPassengers,
      licensePlate,
      color
    );
    sharedCar.currentPosition = currentPosition;
    return sharedCar;
  }
  private static generateTaxiVehicle(id: string) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const numPassengers = faker.datatype.number({ min: 2, max: 7 });
    const licensePlate = RandomDataGenerator.generateRandomLicensePlate();
    const taxi = new Taxi(
      id,
      "to_be_replaced",
      status,
      numPassengers,
      licensePlate
    );
    taxi.currentPosition = currentPosition;
    return taxi;
  }
}
