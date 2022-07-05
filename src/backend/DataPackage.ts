import type {
  Company,
  Payment,
  Route,
  Trip,
  User,
  Vehicle,
} from "./dataFields";

/**
 * The DataPackages maintains the the currently selected data which can be undefined if the user
 * clicks on an empty spot on the map.
 *
 * It stores the vehicle and the trip. With those classes, user, payment, route and company can be retrieved
 * by cross references.
 */
export class DataPackage {
  private vehicle?: Vehicle;
  private trip?: Trip;

  /**
   * Returns the current user or undefined if none is selected.
   *
   * @returns the currently selected user
   */
  getUser(): User | undefined {
    return this.trip?.user;
  }

  /**
   * Returns the current payment or undefined if none is selected.
   *
   * @returns the currently selected payment
   */
  getPayment(): Payment | undefined {
    return this.trip?.payment;
  }

  /**
   * Returns the current route or undefined if none is selected.
   *
   * @returns the currently selected route
   */
  getRoute(): Route | undefined {
    return this.trip?.route;
  }

  /**
   * Returns the current vehicle or undefined if none is selected.
   *
   * @returns the currently selected vehicle
   */
  getVehicle(): Vehicle | undefined {
    return this.vehicle;
  }

  /**
   * Returns the current trip or undefined if none is selected.
   *
   * @returns the currently selected trip
   */
  getTrip(): Trip | undefined {
    return this.trip;
  }

  /**
   * Returns the current company or undefined if none is selected.
   *
   * @returns the currently selected company
   */
  getCompany(): Company | undefined {
    return this.vehicle?.company;
  }

  /**
   * Unsets the current references.
   */
  unsetReferences() {
    this.vehicle = undefined;
    this.trip = undefined;
  }

  /**
   * Updates the current references to vehicle and trip. Trip can be undefined, if the vehicle is inactive.
   *
   * @param vehicle the newly selected vehicle
   * @param trip the newly selected trip that is associated with the vehicle or undefined if vehicle is stationary
   */
  update(vehicle: Vehicle, trip?: Trip) {
    this.vehicle = vehicle;
    this.trip = trip;
  }
}
