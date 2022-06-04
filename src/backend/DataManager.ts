import type { Company } from "./dataFields/Company";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
import type { Vehicle } from "./dataFields/Vehicle";
import { DataLoader } from "./DataLoader";
import type { Route } from "./Route";

export class DataManager {
  users: User[];
  companies: Company[];
  trips: Trip[];
  vehicles: Vehicle[];
  routes: Route[];

  dataLoader: DataLoader;

  /**
   * Construct a new DataManager.
   */
  constructor() {
    this.dataLoader = new DataLoader();
    this.users = [];
    this.companies = [];
    this.trips = [];
    this.vehicles = [];
    this.routes = [];
  }

  /**
   * This method loads all data into the DataManager.
   */
  async loadAllData() {
    this.companies = await this.dataLoader.loadAllCompanies();
    this.vehicles = this.dataLoader.loadAllVehicles();
  }
}
