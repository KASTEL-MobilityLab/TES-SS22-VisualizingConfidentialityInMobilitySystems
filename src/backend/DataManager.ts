import type { Company, DataField, Vehicle } from "./dataFields";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
import { DataLoader } from "./DataLoader";
import { Role } from "./roles";
import type { Route } from "./Route";

export class DataManager {
  currentRole: Role;
  currentUser?: User;
  currentCompany?: Company;
  currentVehicle?: Vehicle;
  currentTrip?: Trip;

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
    //The city is set as the default role
    this.currentRole = Role.city;
    this.dataLoader = new DataLoader();
    this.users = [];
    this.companies = [];
    this.trips = [];
    this.vehicles = [];
    this.routes = [];

    this.loadAllData();
    // this could be problematic here, because loadAllData is async, so
    // it might not be finished when setAllReference is called.
    // we might have to use seperate method for loading and setting references outside of the constructor
    // because the constructor cannot be async (we cannot await this.loadAllData())
    this.setAllReferences();
  }

  private setAllReferences() {
    this.setVehicleReferences();
    // TODO:
    // this.setCompanyReferences();
    // this.setUserReferences();
    // this.setTripReferences();
  }

  /**
   * This method loads all data into the DataManager.
   */
  private async loadAllData() {
    [this.users, this.companies, this.trips, this.vehicles, this.routes] =
      await Promise.all([
        this.dataLoader.loadAllUsers(),
        this.dataLoader.loadAllCompanies(),
        this.dataLoader.loadAllTrips(),
        this.dataLoader.loadAllVehicles(),
        this.dataLoader.loadAllRoutes(),
      ]);
    // this.users = await this.dataLoader.loadAllUsers();
    // this.companies = await this.dataLoader.loadAllCompanies();
    // this.trips = await this.dataLoader.loadAllTrips();
    // this.vehicles = await this.dataLoader.loadAllVehicles();
    // this.routes = await this.dataLoader.loadAllRoutes();
  }

  // TODO: replace with generic function <T extends DataField> when ready
  getDataById(id: string): DataField {
    return this.vehicles[0];
  }

  private setVehicleReferences() {
    for (const vehicle of this.vehicles) {
      vehicle.company = this.getForeignKeyReference<Company>(
        vehicle.companyId,
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

  /**
   * Change the current role.
   * @param role The selected role from the enum roles.
   */
  private changeRole(role: string) {
    if (!(role in Role)) {
      throw Error(`Could not change role to ${role}`);
    }
    this.currentRole = <Role>role;
  }

  /**
   * Change the current user.
   * TODO: implement getDataById
   * @param userId The user of the selected user.
   */
  private changeUser(userId: string) {
    this.currentUser = <User>this.getDataById(userId);
  }

  /**
   * Change the current company.
   * TODO: implement getDataById
   * @param companyId The user of the selected company.
   */
  private changeCompany(companyId: string) {
    this.currentCompany = <Company>this.getDataById(companyId);
  }

  /**
   * Change the current vehicle.
   * TODO: implement getDataById
   * @param vehicleId The user of the selected vehicle.
   */
  private changeVehicle(vehicleId: string) {
    this.currentVehicle = <Vehicle>this.getDataById(vehicleId);
  }

  /**
   * Change the current trip.
   * TODO: implement getDataById
   * @param tripId The user of the selected trip.
   */
  private changeTrip(tripId: string) {
    this.currentTrip = <Trip>this.getDataById(tripId);
  }
}
