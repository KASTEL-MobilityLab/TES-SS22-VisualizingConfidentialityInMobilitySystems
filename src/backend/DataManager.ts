import type { Company, DataField, Payment, Vehicle } from "./dataFields";
import type { Trip } from "./dataFields/Trip";
import type { User } from "./dataFields/User";
import { DataLoader } from "./DataLoader";
import type { Route } from "./Route";
import { Role } from "./roles";

export class DataManager {
  currentRole: Role;
  currentUser?: User;
  currentCompany?: Company;
  currentVehicle?: Vehicle;
  currrentTrip?: Trip;

  companies: Company[];
  payments: Payment[];
  trips: Trip[];
  users: User[];
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
    this.companies = [];
    this.payments = [];
    this.trips = [];
    this.users = [];
    this.vehicles = [];
    this.routes = [];

    this.loadAllData();
  }

  /**
   * This method loads all data into the DataManager.
   */
  private async loadAllData() {
    this.users = await this.dataLoader.loadAllUsers();
    this.companies = await this.dataLoader.loadAllCompanies();
    this.trips = await this.dataLoader.loadAllTrips();
    this.vehicles = await this.dataLoader.loadAllVehicles();
    this.routes = await this.dataLoader.loadAllRoutes();
  }

  // TODO: replace with generic function <T extends DataField> when ready
  getDataById(id: string): DataField {
    return this.vehicles[0];
  }

  /**
   * Sets the specific trip referencee of a payment.
   */
  private setPaymentReferences() {
    for (const payment of this.payments) {
      payment.trip = this.getForeignKeyReference<Trip>(
        payment.tripId,
        this.trips
      );
    }
  }

  /**
   * Sets the specfic company reference of a vehicle.
   */
  private setVehicleReferences() {
    for (const vehicle of this.vehicles) {
      vehicle.company = this.getForeignKeyReference<Company>(
        vehicle.companyId,
        this.companies
      );
    }
  }

  /**
   * Sets the specifc vehicle, user, payment, and route references of a trip.
   */
  private setTripReferences() {
    for (const trip of this.trips) {
      trip.vehicle = this.getForeignKeyReference<Vehicle>(
        trip.vehicleId,
        this.vehicles
      );
      trip.user = this.getForeignKeyReference<User>(trip.userId, this.users);
      trip.payment = this.getForeignKeyReference<Payment>(
        trip.paymentId,
        this.payments
      );
      trip.route = this.getForeignKeyReference<Route>(
        trip.routeId,
        this.routes
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
    this.currentUser = this.getDataById(userId);
  }

  /**
   * Change the current company.
   * TODO: implement getDataById
   * @param companyId The user of the selected company.
   */
  private changeCompany(companyId: string) {
    this.currentCompany = this.getDataById(companyId);
  }

  /**
   * Change the current vehicle.
   * TODO: implement getDataById
   * @param vehicleId The user of the selected vehicle.
   */
  private changeVehicle(vehicleId: string) {
    this.currentVehicle = this.getDataById(vehicleId);
  }

  /**
   * Change the current trip.
   * TODO: implement getDataById
   * @param tripId The user of the selected trip.
   */
  private changeTrip(tripId: string) {
    this.currrentTrip = this.getDataById(tripId);
  }
}
