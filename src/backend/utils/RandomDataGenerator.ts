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
  COMPANY_ID_PREFIX,
  PaymentType,
  PAYMENT_ID_PREFIX,
  ROUTE_ID_PREFIX,
  TRIP_ID_PREFIX,
  USER_ID_PREFIX,
  VehicleStatus,
  VehicleType,
  VEHICLE_ID_PREFIX,
  type CompanyId,
  type Id,
  type LicensePlate,
  type PaymentId,
  type RouteId,
  type TripId,
  type VehicleId,
} from "../dataFields/types";
import { Bicycle } from "../dataFields/vehicles/Bicycle";
import { SharedCar } from "../dataFields/vehicles/SharedCar";
import { Taxi } from "../dataFields/vehicles/Taxi";
import { LatLng } from "./LatLng";
const DEFAULT_LOCALE = "de";
faker.setLocale(DEFAULT_LOCALE);

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
  private static readonly DEFAULT_CENTER_LOCATION: [number, number] = [
    49.009, 8.4,
  ];
  private static readonly PREFIX_ZERO_THRESHOLD = 10;
  private static readonly START_COUNTER_OF_ID = "0";
  private static readonly EMPTY_ID = "";
  private static readonly FUTURE_TIME = 10;
  private static readonly PHONE_COUNTRY_CODE_GERMANY = "49########";
  private static readonly ROUTE_RADIUS = 1000;
  private static readonly LAT_POSITION = 0;
  private static readonly LNG_POSITION = 1;
  private static readonly MIN_VEHICLE_CONDITION = 0;
  private static readonly MAX_VEHICLE_CONDITION = 100;
  private static readonly MIN_VEHICLE_BATTERY_CONDITION = 0;
  private static readonly MAX_VEHICLE_BATTERY_CONDITION = 100;
  private static readonly MIN_VEHICLE_BATTERY_LEVEL = 0;
  private static readonly MAX_VEHICLE_BATTERY_LEVEL = 100;
  private static readonly COMPANY_ID_PLACEHOLDER: CompanyId = "C00";
  private static readonly LENGTH_OF_RANDOM_LICENSE_PLATE_NUMBER = 4;
  private static readonly LENGTH_OF_RANDOM_LICENSE_PLATE_NAME = 2;
  private static readonly CASING_OF_LICENSE_PLATE = "upper";
  private static readonly CITY_OF_LICENSE_PLATE = "KA";
  private static readonly LICENSE_PLATE_SEPARATOR = "-";
  private static readonly MIN_NUMBER_OF_PASSENGERS_IN_CAR = 2;
  private static readonly MAX_NUMBER_OF_PASSENGERS_IN_CAR = 7;

  // helper function for generating multiple entities
  private static generateMultiple<T extends DataField>(
    generator: (id: Id) => T,
    count: number,
    startId: number,
    idPrefix: string
  ): T[] {
    const data: T[] = [];
    for (let i = 0; i < count; i++) {
      const id = RandomDataGenerator.getIdString(idPrefix, startId + i) as Id;
      const entity: T = generator(id);
      data.push(entity);
    }
    return data;
  }

  private static getIdString(idPrefix: string, id: number) {
    return `${idPrefix}${
      id < RandomDataGenerator.PREFIX_ZERO_THRESHOLD
        ? RandomDataGenerator.START_COUNTER_OF_ID
        : RandomDataGenerator.EMPTY_ID
    }${id}`;
  }

  // User data generation -------------------------------------------------------

  /**
   * Generates a random user.
   *
   * @param id the user Id in the form of U{number}
   * @returns a randomly generated user
   */
  static generateUser(id: Id) {
    const forename = faker.name.firstName();
    const surname = faker.name.lastName();
    const email = faker.internet.email(forename, surname);
    const phoneNumber = parseInt(
      faker.phone.number(RandomDataGenerator.PHONE_COUNTRY_CODE_GERMANY)
    );
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
    return this.generateMultiple(
      this.generateUser,
      count,
      startId,
      USER_ID_PREFIX
    );
  }

  // Payment data generation -----------------------------------------------------

  /**
   * Generates a random payment.
   *
   * @param id the id of the payment
   * @returns a random payment
   */
  static generatePayment(id: Id, user?: User): Payment {
    const paymentType = randomEnumElement(PaymentType);
    // assume trip ID is the same as payment ID
    const tripId = id.replace(PAYMENT_ID_PREFIX, TRIP_ID_PREFIX);
    switch (paymentType) {
      case PaymentType.Cash:
        return new Cash(id as PaymentId, tripId as TripId);
      case PaymentType.CreditCard:
        return RandomDataGenerator.generateCreditCardPayment(
          id as PaymentId,
          tripId as TripId
        );
      case PaymentType.PayPal:
        return RandomDataGenerator.generatePayPalPayment(
          id as PaymentId,
          tripId as TripId,
          user
        );
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
        const paymentId = RandomDataGenerator.getIdString(
          PAYMENT_ID_PREFIX,
          startId++
        );
        payments.push(this.generatePayment(paymentId as PaymentId, user));
      }
      return [payments, users];
    }
    return RandomDataGenerator.generateMultiple(
      RandomDataGenerator.generatePayment,
      count,
      startId,
      PAYMENT_ID_PREFIX
    );
  }

  private static generateCreditCardPayment(
    id: PaymentId,
    tripId: TripId
  ): CreditCard {
    const provider = faker.finance.creditCardIssuer();
    const cardNumber = parseInt(faker.finance.creditCardNumber(provider));
    const ccv = parseInt(faker.finance.creditCardCVV());
    const expiryDate = faker.date.future(RandomDataGenerator.FUTURE_TIME);
    return new CreditCard(cardNumber, ccv, expiryDate, provider, id, tripId);
  }

  private static generatePayPalPayment(
    id: PaymentId,
    tripId: TripId,
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
      ROUTE_ID_PREFIX
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
    id: Id,
    radius = RandomDataGenerator.ROUTE_RADIUS,
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
    return new Route(id as RouteId, start, end);
  }

  private static generateRandomLatLng(
    centerLocation: [
      number,
      number
    ] = RandomDataGenerator.DEFAULT_CENTER_LOCATION,
    radius = RandomDataGenerator.ROUTE_RADIUS
  ): LatLng {
    const latLng = faker.address
      .nearbyGPSCoordinate(centerLocation, radius, true)
      .map(parseFloat) as [number, number];
    return new LatLng(
      latLng[RandomDataGenerator.LAT_POSITION],
      latLng[RandomDataGenerator.LNG_POSITION]
    );
  }

  // Company data generation -----------------------------------------------------

  /**
   * Generates a random company.
   */
  static generateCompany(id: Id) {
    const name = faker.company.name();
    return new Company(id as CompanyId, name);
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
      COMPANY_ID_PREFIX
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
    let generator: (id: Id) => Vehicle;
    if (!vehicleType) {
      vehicleType = randomEnumElement(VehicleType);
    }
    switch (vehicleType) {
      case VehicleType.EScooter:
        return RandomDataGenerator.generateMultiple(
          this.generateEScooterVehicle,
          count,
          vehicleStartId,
          VEHICLE_ID_PREFIX
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
      VEHICLE_ID_PREFIX
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

  private static generateEScooterVehicle(id: Id) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const condition = faker.datatype.number({
      min: RandomDataGenerator.MIN_VEHICLE_CONDITION,
      max: RandomDataGenerator.MAX_VEHICLE_CONDITION,
    });
    const batteryCondition = faker.datatype.number({
      min: RandomDataGenerator.MIN_VEHICLE_BATTERY_CONDITION,
      max: RandomDataGenerator.MAX_VEHICLE_BATTERY_CONDITION,
    });
    const batteryLevel = faker.datatype.number({
      min: RandomDataGenerator.MIN_VEHICLE_BATTERY_LEVEL,
      max: RandomDataGenerator.MAX_VEHICLE_BATTERY_LEVEL,
    });
    const escooter = new EScooter(
      id as VehicleId,
      RandomDataGenerator.COMPANY_ID_PLACEHOLDER,
      condition,
      batteryCondition,
      status,
      batteryLevel
    );
    escooter.currentPosition = currentPosition;
    return escooter;
  }
  private static generateTrainVehicle(id: Id) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const train = new Train(
      id as VehicleId,
      RandomDataGenerator.COMPANY_ID_PLACEHOLDER,
      status
    );
    train.currentPosition = currentPosition;
    return train;
  }

  private static generateBikeVehicle(id: Id) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const electric = faker.datatype.boolean();
    const electricLock = faker.datatype.boolean();
    const bike = new Bicycle(
      id as VehicleId,
      RandomDataGenerator.COMPANY_ID_PLACEHOLDER,
      status,
      electric,
      electricLock
    );
    bike.currentPosition = currentPosition;
    return bike;
  }
  private static generateRandomLicensePlate(): LicensePlate {
    const number = faker.random.numeric(
      RandomDataGenerator.LENGTH_OF_RANDOM_LICENSE_PLATE_NUMBER
    );
    const alphas = faker.random.alpha({
      count: RandomDataGenerator.LENGTH_OF_RANDOM_LICENSE_PLATE_NAME,
      casing: RandomDataGenerator.CASING_OF_LICENSE_PLATE,
    });
    return (RandomDataGenerator.CITY_OF_LICENSE_PLATE +
      RandomDataGenerator.LICENSE_PLATE_SEPARATOR +
      `${alphas}` +
      RandomDataGenerator.LICENSE_PLATE_SEPARATOR +
      `${number}`) as LicensePlate;
  }
  private static generateSharedCarVehicle(id: Id) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const numPassengers = faker.datatype.number({
      min: RandomDataGenerator.MIN_NUMBER_OF_PASSENGERS_IN_CAR,
      max: RandomDataGenerator.MAX_NUMBER_OF_PASSENGERS_IN_CAR,
    });
    const licensePlate = RandomDataGenerator.generateRandomLicensePlate();
    const color = faker.color.human();
    const sharedCar = new SharedCar(
      id as VehicleId,
      RandomDataGenerator.COMPANY_ID_PLACEHOLDER,
      status,
      numPassengers,
      licensePlate,
      color
    );
    sharedCar.currentPosition = currentPosition;
    return sharedCar;
  }
  private static generateTaxiVehicle(id: Id) {
    const [status, currentPosition] =
      RandomDataGenerator.generateBaseVehicleAttributes();
    const numPassengers = faker.datatype.number({
      min: RandomDataGenerator.MIN_NUMBER_OF_PASSENGERS_IN_CAR,
      max: RandomDataGenerator.MAX_NUMBER_OF_PASSENGERS_IN_CAR,
    });
    const licensePlate = RandomDataGenerator.generateRandomLicensePlate();
    const taxi = new Taxi(
      id as VehicleId,
      RandomDataGenerator.COMPANY_ID_PLACEHOLDER,
      status,
      numPassengers,
      licensePlate
    );
    taxi.currentPosition = currentPosition;
    return taxi;
  }
}
