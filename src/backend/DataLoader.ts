import companyJson from "../data/companies.json";
import vehicleJson from "../data/vehicles.json";
import type { Company } from "./dataFields/Company";
import type { Vehicle } from "./dataFields/Vehicle";
import { Train } from "./dataFields/vehicles/Train";
import { EScooter } from "./dataFields/vehicles/EScooter";

export class DataLoader {
  /**
   * Loads all data from the respective company json file and transforms the array of data to an array of companies
   *
   * @returns an array of companies
   */
  loadAllCompanies(): Company[] {
    const transformedCompanyData: Company[] = [];
    return transformedCompanyData;
  }

  /**
   * Loads all data from the respective vehicle json file and transform the array of data to an array of vehilces
   *
   * @returns an array of vehicles
   */
  loadAllVehicles(): Vehicle[] {
    //TODO: Find solution for giving the plainToInstance method the class/interface Vehcicle instead of the realizing class Train
    const transformedVehicleData: Vehicle[] = [];
    return transformedVehicleData;
  }
}
