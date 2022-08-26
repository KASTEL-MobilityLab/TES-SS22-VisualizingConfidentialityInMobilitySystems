import { Company, Route, User } from "@/backend/dataFields";
import { faker } from "@faker-js/faker";
import { LatLng } from "./LatLng";

/**
 * Random data generator for Datafield classes.
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
   * Generates n random users.
   *
   * @param count the number of users to generate
   * @param startId the start id of the first user
   * @returns an array of randomly generated users
   */
  generateUsers(count: number, startId: number) {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
      const id = `U${startId + i < 10 ? "0" : ""}${startId + i}`;
      users.push(this.generateUser(id));
    }
    return users;
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

  /**
   * Generates a random company.
   */
  generateCompany(id: string) {
    const name = faker.company.name();
    return new Company(id, name);
  }
}
