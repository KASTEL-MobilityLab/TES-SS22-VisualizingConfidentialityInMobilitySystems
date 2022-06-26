import type {
  Company,
  Payment,
  Route,
  Trip,
  User,
  Vehicle,
} from "./dataFields";

export class DataPackage {
  private vehicle?: Vehicle;
  private trip?: Trip;

  getUser(): User | undefined {
    return this.trip?.user;
  }

  getPayment(): Payment | undefined {
    return this.trip?.payment;
  }

  getRoute(): Route | undefined {
    return this.trip?.route;
  }

  getVehicle(): Vehicle | undefined {
    return this.vehicle;
  }

  getTrip(): Trip | undefined {
    return this.trip;
  }

  getCompany(): Company | undefined {
    return this.vehicle?.company;
  }

  // called, when the user clicks on an empty spot on the map -> deselect
  unsetReferences() {
    this.vehicle = undefined;
    this.trip = undefined;
  }

  update(vehicle: Vehicle, trip?: Trip) {
    this.vehicle = vehicle;
    this.trip = trip;
  }
}
