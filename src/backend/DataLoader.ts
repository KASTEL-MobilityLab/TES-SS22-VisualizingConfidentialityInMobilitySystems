import { plainToInstance } from "class-transformer";
import userJson from "../data/users.json";
import vehicleJson from "../data/vehicles.json";
import { Company } from "./dataFields/Company";
import { VehicleType } from "./dataFields/types";
import { User } from "./dataFields/User";
import type { Vehicle } from "./dataFields/Vehicle";
import { EScooter } from "./dataFields/vehicles/EScooter";
import { Train } from "./dataFields/vehicles/Train";

/**
 * Specifies, which data can be loaded with the function {@link getData}.
 */
export enum AvailableData {
  companies = "companies",
  users = "users",
  vehicles = "vehicles",
  payments = "payments",
}

/**
 * Dynamically import the specified json file. Valid strings are specified in the {@link AvailableData} enum.
 * @param fileName A string that specifies the filename, i.e for src/data/companies.json `fileName='companies'`
 * or `fileName='AvailableData.companies'"
 * @returns a Promise of Record<string, unknown>
 */
export async function getData(
  fileName: string
): Promise<Record<string, unknown>[]> {
  if (!(fileName in AvailableData)) {
    throw Error(`Could not import data from src/data/${fileName}.json`);
  }
  try {
    const data = await import(`../data/${fileName}.json`);
    return data.default;
  } catch (err) {
    throw Error(`Unexpected error parsing the JSON file: ${err}`);
  }
}

/**
 * The DataLoader takes care of loading local JSON files and transforms them to their corresponding classes.
 */
export class DataLoader {
  /**
   * Loads all data from the respective company json file and transforms the array of data to an array of companies
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
   * Loads all data from the respective User json file and transform the array of data to an array of User
   *
   * @returns an array of {@link User}
   */
  loadAllUsers(): User[] {
    const users: User[] = plainToInstance(User, userJson);
    return users;
  }

  /**
   * Loads all data from the respective vehicle json file and transform the array of data to an array of vehicles
   *
   * @returns an array of {@link Vehicle}s
   */
  loadAllVehicles(): Vehicle[] {
    const vehicles: Vehicle[] = [];

    // push all escooters
    vehicles.push(
      ...plainToInstance(EScooter, vehicleJson, {
        excludeExtraneousValues: true,
      }).filter((v) => v.type === VehicleType.escooter)
    );

    // push all trains
    vehicles.push(
      ...plainToInstance(Train, vehicleJson, {
        excludeExtraneousValues: true,
      }).filter((v) => v.type === VehicleType.train)
    );

    return vehicles;
  }
}
