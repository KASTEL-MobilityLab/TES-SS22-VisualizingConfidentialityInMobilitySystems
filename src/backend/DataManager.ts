import { DELIMITER, type DataTypeKey } from "@/utils/translationUtils";
import { isNode } from "browser-or-node";
import { AggregatedData } from "./AggregatedData";
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
import { TripAnimator } from "./TripAnimator";
import type { LatLng } from "./utils/LatLng";
import { fetchWaypoints } from "./utils/Routing";
export class DataManager {
  private static readonly ANIMATION_SPEED = 15;
  private static readonly DATATYPE_POSITION = 1;
  currentRole: Role;

  companies: Company[];
  payments: Payment[];
  trips: Trip[];
  users: User[];
  vehicles: Vehicle[];
  routes: Route[];

  dataLoader: DataLoader;
  riskManager: RiskManager;
  tripAnimator?: TripAnimator;
  //The currently selected DataPackage
  currentData: DataPackage;
  aggregatedData: AggregatedData;

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
    this.aggregatedData = new AggregatedData();
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
  async init(autoStartAnimation = true) {
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
    await this.setRouteWaypoints();
    this.trips.map((trip) => {
      trip.setVehicleStartPosition();
      trip.setGeocodedTripPositions();
    });
    this.tripAnimator = new TripAnimator(
      this.trips,
      DataManager.ANIMATION_SPEED
    );
    this.aggregatedData.init(this.trips);
    if (autoStartAnimation) {
      this.startAnimation();
    }
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
   * Sets the route waypoints of a trip.
   */
  private async setRouteWaypoints() {
    if (isNode) {
      // don't fetch the routes in test mode.
      return;
    }
    Promise.all(
      this.routes.map(
        async (route) => (route.waypoints = await this.getRouteWaypoints(route))
      )
    );
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
  changeRole(role: string) {
    if (!(role in Role)) {
      throw Error(`Could not change role to ${role}`);
    }
    this.currentRole = <Role>role;
  }

  // find a trip by its vehicle.
  private getTripByVehicle(vehicle: Vehicle): Trip {
    const trip = this.trips.find((trip) => trip.vehicleId === vehicle.id);
    if (!trip) {
      throw Error(`No trip is found for vehicle ${vehicle.id}`);
    }
    return trip;
  }

  /**
   * Updates the Risk, that is currently selected by the user.
   *
   * @param risk the risk that is currently selected
   */
  setCurrentRisk(risk: string | Risk) {
    this.riskManager.setCurrentRisk(risk);
  }

  /**
   * Returns the currently selected Risk.
   *
   * @returns the currently selected Risk
   */
  getCurrentRisk() {
    return this.riskManager.getCurrentRisk();
  }

  /**
   * Returns the currently selected Risk Explanations.
   *
   * @returns the currently selected Risk Explanation.
   */
  getCurrentRiskExplanation() {
    return this.riskManager.getCurrentRiskExplanation();
  }

  /**
   * Returns the visibility of the currently selected Risk.
   *
   * @returns the visibility of the currently selected Risk.
   */
  getCurrentVisibility() {
    return this.riskManager.getCurrentVisibility(this.currentRole);
  }

  /**
   * Returns the datatype with the given key.
   *
   * @param key the (translation) key of the data type
   * @returns the actual DataType
   */
  getDataType(key: DataTypeKey): DataType {
    return <DataType>key.split(DELIMITER)[DataManager.DATATYPE_POSITION];
  }

  /**
   *
   * @param dataTypeKey the key of the data type
   * @returns
   */
  getRoleVisibility(dataTypeKey: DataTypeKey): boolean {
    const dataType: DataType = this.getDataType(dataTypeKey);
    const risk: Risk = this.riskManager.findRisk(dataType);
    return risk.isVisible(this.currentRole);
  }

  /**
   * True if the animation is currently running.
   *
   * @returns true if the animation is running.
   */
  getIsRunning() {
    return this.tripAnimator?.isRunning;
  }

  /**
   * Fetches the waypoints of the given route.
   *
   * @param route the route to fetch the waypoints for
   */
  async getRouteWaypoints(route: Route): Promise<LatLng[]> {
    return await fetchWaypoints(route);
  }

  /**
   * Starts the animation of the vehicles.
   */
  startAnimation() {
    this.tripAnimator?.start();
  }

  /**
   * Pauses the animation of the vehicles.
   */
  stopAnimation() {
    this.tripAnimator?.stop();
  }

  /**
   * Resets the animation by moving the vehicles back to the starting positions.
   */
  resetAnimation() {
    this.tripAnimator?.reset();
    this.startAnimation();
  }
}
