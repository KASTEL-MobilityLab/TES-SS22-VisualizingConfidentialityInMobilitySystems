import type {
  Company,
  DataField,
  Payment,
  Trip,
  User,
  Vehicle,
} from "./dataFields";
import type { Route } from "./dataFields/Route";
import { DataLoader, type DataLoaderParams } from "./DataLoader";
import { DataPackage } from "./DataPackage";
import type { DataType } from "./DataType";
import type { Risk } from "./riskManager/Risk";
import { RiskManager } from "./riskManager/RiskManager";
import { Role } from "./Role";

export class DataManager {
  currentRole: Role;
  roleUser?: User;
  roleCompany?: Company;

  companies: Company[];
  payments: Payment[];
  trips: Trip[];
  users: User[];
  vehicles: Vehicle[];
  routes: Route[];

  dataLoader: DataLoader;
  //The currently selected DataPackage
  currentData: DataPackage;
  riskManager: RiskManager;
  private currentRisk?: Risk;

  /**
   * Construct a new DataManager.
   */
  constructor(dataLoaderParams: DataLoaderParams = {}) {
    //The city is set as the default role
    this.currentRole = Role.City;
    this.dataLoader = new DataLoader(dataLoaderParams);
    this.riskManager = new RiskManager();
    this.companies = [];
    this.payments = [];
    this.trips = [];
    this.users = [];
    this.vehicles = [];
    this.routes = [];
    this.currentData = new DataPackage();
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
    let risks: Risk[];
    [
      this.users,
      this.companies,
      this.trips,
      this.vehicles,
      this.routes,
      this.payments,
      risks,
    ] = await this.dataLoader.loadAllData();
    this.riskManager.risks = risks;
    this.setAllReferences();
    this.trips.map((trip) => trip.setVehicleStartPosition());
  }

  /**
   * Updates the selected references by the given vehicle.
   * If the vehicle is inactive, only the vehicle (and therefore company) will be changed.
   * If it is active, the vehicle and the trip will be changed, causing the data package
   * to update user and payment as well.
   *
   * @param vehicle the new selected vehicle
   */
  updateByVehicle(vehicle: Vehicle) {
    let trip: Trip | undefined = undefined;

    // check if vehicle is stationary or associated to a trip (active)
    if (vehicle.isActive()) {
      // vehicle is not stationary
      trip = this.getTripByVehicle(vehicle);
    }
    this.currentData.update(vehicle, trip);
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
   * Sets the specific company reference of a vehicle and its ownerName.
   */
  private setVehicleReferences() {
    for (const vehicle of this.vehicles) {
      const company: Company = this.getForeignKeyReference<Company>(
        vehicle.companyId,
        this.companies
      );
      vehicle.company = company;
      vehicle.ownerName = company.name;
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
    this.roleUser = <User>this.getDataById(userId, this.users);
  }

  /**
   * Change the current company.
   * @param companyId The user of the selected company.
   */
  private changeCompany(companyId: string) {
    this.roleCompany = <Company>this.getDataById(companyId, this.companies);
  }

  // find a trip by its vehicle.
  private getTripByVehicle(vehicle: Vehicle): Trip {
    const trip = this.trips.find((trip) => trip.vehicleId === vehicle.id);
    if (!trip) {
      throw Error(`No trip is found for vehicle ${vehicle.id}`);
    }
    return trip;
  }

  setCurrentRisk(risk: string | Risk) {
    if (typeof risk === "string") {
      try {
        const dataType = <DataType>risk;
        this.currentRisk = this.riskManager.findRisk(dataType);
      } catch (e) {
        throw Error(`Could not convert string ${risk} to DataType`);
      }
    } else {
      this.currentRisk = risk;
    }
  }

  /**
   * Returns the currently selected Risk.
   *
   * @returns the currently selected Risk
   */
  getCurrentRisk(): Risk {
    if (!this.currentRisk) {
      throw Error("Currently, no risk is selected.");
    }
    return this.currentRisk;
  }

  /**
   * Returns the currently selected Risk Explanations.
   *
   * @returns the currently selected Risk Explanation.
   */
  getCurrentRiskExplanation() {
    const currentRisk = this.getCurrentRisk();
    return currentRisk.explanation;
  }

  /**
   * Returns the visibility of the currently selected Risk.
   *
   * @returns the visibility of the currently selected Risk.
   */
  getCurrentVisibility() {
    const currentRisk = this.getCurrentRisk();
    return currentRisk.isVisible(this.currentRole);
  }
}
