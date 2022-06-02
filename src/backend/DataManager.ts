import type { Company } from "./dataFields/Company";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
import { DataLoader } from "./DataLoader";

export class DataManager {
  users: User[];
  companies: Company[];
  trips: Trip[];

  dataLoader: DataLoader;

  private dataPath = "@/data/";

  constructor() {
    this.dataLoader = new DataLoader();
    this.users = [];
    this.companies = [];
    this.trips = [];
  }

  /**
   * This method (asnchronously) loads all data into the DataManager.
   */
  async loadAllData() {
    this.users = this.dataLoader.loadUsers();
    this.trips = this.dataLoader.loadTrips();
  }
}
