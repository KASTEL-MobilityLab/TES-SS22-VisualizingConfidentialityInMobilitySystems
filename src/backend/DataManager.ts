import type { Company } from "./dataFields/Company";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
import { DataLoader } from "./DataLoader";

export class DataManager {
  users: User[];
  companies: Company[];
  trips: Trip[];

  dataLoader: DataLoader;

  constructor() {
    this.dataLoader = new DataLoader();
    this.users = [];
    this.companies = [];
    this.trips = [];
  }

  /**
   * This method loads all data into the DataManager.
   */
  async loadAllData() {
    this.users = await this.dataLoader.loadUsers();
    this.trips = this.dataLoader.loadTrips();
  }
}
