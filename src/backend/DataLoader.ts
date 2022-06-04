import { plainToInstance } from "class-transformer";
import companyJson from "../data/companies.json";
import userJson from "../data/users.json";
import vehicleJson from "../data/vehicles.json";
import { Company } from "./dataFields/Company";
import { User } from "./dataFields/User";
import type { Vehicle } from "./dataFields/Vehicle";
import { EScooter } from "./dataFields/vehicles/EScooter";

export class DataLoader {
  /**
   * Loads all data from the respective company json file and transforms the array of data to an array of companies
   *
   * @returns an array of companies
   */
  loadAllCompanies(): Company[] {
    const transformedCompanyData: Company[] = plainToInstance(
      Company,
      companyJson
    );
    return transformedCompanyData;
  }

  loadAllUsers(): User[] {
    const users: User[] = plainToInstance(User, userJson);
    return users;
  }

  /**
   * Loads all data from the respective vehicle json file and transform the array of data to an array of vehicles
   *
   * @returns an array of vehicles
   */
  loadAllVehicles(): Vehicle[] {
    const transformedVehicleData: Vehicle[] = plainToInstance(
      EScooter,
      vehicleJson,
      { enableImplicitConversion: true }
    );
    return transformedVehicleData;
  }
}
