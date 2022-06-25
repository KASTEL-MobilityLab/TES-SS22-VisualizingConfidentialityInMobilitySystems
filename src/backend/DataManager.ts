import {
  Company,
  Trip,
  User,
  Vehicle,
  type DataField,
  type Payment,
} from "./dataFields";
import { Route } from "./dataFields/Route";
import { DataLoader, type DataLoaderParams } from "./DataLoader";
import { DataModule } from "./dataModules/DataModule";
import type { RiskDefinition } from "./riskManager/RiskDefinition";
import { RiskManager } from "./riskManager/RiskManager";
import { Role } from "./roles";

export class DataManager {
  currentRole: Role;
  currentUser?: User;
  currentCompany?: Company;
  currentVehicle?: Vehicle;
  currentTrip?: Trip;

  companies: Company[];
  payments: Payment[];
  trips: Trip[];
  users: User[];
  vehicles: Vehicle[];
  routes: Route[];

  dataLoader: DataLoader;
  //The currently selected DataModule
  currentDataPackage?: DataModule;
  riskManager: RiskManager;

  /**
   * Construct a new DataManager.
   */
  constructor(dataLoaderParams: DataLoaderParams = {}) {
    //The city is set as the default role
    this.currentRole = Role.city;
    this.dataLoader = new DataLoader(dataLoaderParams);
    this.riskManager = new RiskManager();
    this.companies = [];
    this.payments = [];
    this.trips = [];
    this.users = [];
    this.vehicles = [];
    this.routes = [];
  }

  /**
   * This method sets all references that have not been set in the initialization
   */
  private setAllReferences() {
    this.setVehicleReferences();
    this.setPaymentReferences();
    this.setTripReferences();
  }

  /**
   * This method initializes the data manager by asynchronously loading all data.
   */
  async init() {
    let riskDefinitions: RiskDefinition[];
    [
      this.users,
      this.companies,
      this.trips,
      this.vehicles,
      this.routes,
      this.payments,
      riskDefinitions,
    ] = await Promise.all([
      this.dataLoader.loadTransformedData(User, "users"),
      this.dataLoader.loadTransformedData(Company, "companies"),
      this.dataLoader.loadTransformedData(Trip, "trips"),
      this.dataLoader.loadAllVehicles(),
      this.dataLoader.loadTransformedData(Route, "routes"),
      this.dataLoader.loadAllPayments(),
      this.dataLoader.loadAllRisks(),
    ]);
    this.riskManager.riskDefinitions = riskDefinitions;
    this.setAllReferences();
  }

  /**
   * Searches for a given DataField in the particular referenceArray.
   * If the given id does not match any DataField in the array, an error will be thrown.
   * @param id Id of the searched DataField
   * @param referencesArray Array of the type of the searched DataField
   * @returns Matching DataField to the given id
   */
  getDataById<T extends DataField>(id: string, referenceArray: T[]): T {
    const data = referenceArray.find((dataField) => dataField.id === id);
    if (data === undefined) {
      throw Error(`No data is found with the Id ${id}`);
    }
    return data;
  }

  /**
   * Sets the specific trip reference of a payment.
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
   * Sets the specific company reference of a vehicle.
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
   * Sets the specific vehicle, user, payment, and route references of a trip.
   */
  setTripReferences() {
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
   * @param referenceId Id of the referenced DataField
   * @param referencesArray Array of the type of the referenced DataField
   * @returns DataField that is referenced with the referenceId
   */
  private getForeignKeyReference<T extends DataField>(
    referenceId: string,
    referencesArray: T[]
  ): T {
    const ref = referencesArray.find(
      (dataField) => dataField.id === referenceId
    );
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
   * @param userId The user of the selected user.
   */
  private changeUser(userId: string) {
    this.currentUser = <User>this.getDataById(userId, this.users);
  }

  /**
   * Change the current company.
   * @param companyId The user of the selected company.
   */
  private changeCompany(companyId: string) {
    this.currentCompany = <Company>this.getDataById(companyId, this.companies);
  }

  /**
   * Change the current vehicle.
   * @param vehicleId The user of the selected vehicle.
   */
  private changeVehicle(vehicleId: string) {
    this.currentVehicle = <Vehicle>this.getDataById(vehicleId, this.vehicles);
  }

  /**
   * Change the current trip.
   * @param tripId The user of the selected trip.
   */
  private changeTrip(tripId: string) {
    this.currentTrip = <Trip>this.getDataById(tripId, this.trips);
  }

  /**
   * Changes the current Data to a new DataModule
   * @param vehicle The vehicle that is selected.
   * @param user The user that is driving the trip.
   * @param payment The payment with which the trip is paid.
   * @param trip The trip that is driven by the user.
   */
  private changeCurrentData(
    vehicle: Vehicle,
    user?: User,
    payment?: Payment,
    trip?: Trip
  ) {
    if (user != undefined) {
      const userDataModule = new DataModule(user, this.riskManager);
    }
  }
}
