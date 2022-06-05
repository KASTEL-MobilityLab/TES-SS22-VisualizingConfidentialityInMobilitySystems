import type { Company, DataField, Vehicle } from "./dataFields";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
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

    this.loadAllData();
  }

  /**
   * This method loads all data into the DataManager.
   */
  private async loadAllData() {
    this.companies = await this.dataLoader.loadAllCompanies();
    this.vehicles = this.dataLoader.loadAllVehicles();
  }

  // TODO: replace with generic function <T extends DataField> when ready
  getDataById(id: string): Vehicle {
    return this.vehicles[0];
  }

  private setVehicleReferences() {
    for (const veh of this.vehicles) {
      veh.company = this.getForeignKeyReference<Company>(
        veh.companyId,
        this.companies
      );
    }
  }

  /**
   * Searches for a given reference in the referenceArray.
   * If the given referenceId does not match any reference in the array, an error will be thrown.
   */
  private getForeignKeyReference<T extends DataField>(
    referenceId: string,
    referencesArray: T[]
  ): T {
    const ref = referencesArray.find((df) => df.id === referenceId);
    if (ref === undefined) {
      throw Error(`No Key matches the given reference Id ${referenceId}`);
    }
    return ref;
  }
}
