export {};
import {
  getCompanyData,
  getPaymentData,
  getRouteData,
  getTripData,
  getUserData,
  getVehicleData,
  getPosFromId,
} from "src/backend/DataLoader.js";
import { Company } from "./dataFields/Company";
import type { Vehicle } from "./dataFields/Vehicle";
import { User } from "./dataFields/User";
import { EScooter } from "./dataFields/vehicles/EScooter";
import { VehicleStatus, PaymentType } from "./dataFields/types";
import { Trip } from "./dataFields/Trip";
import { CreditCard } from "./dataFields/payments/CreditCard";
import type { Payment } from "./dataFields/Payment";
import type { Route } from "./Route";

const userArray = Array<User>();

const companyArray = Array<Company>();

const vehicleArray = Array<Vehicle>();

const tripArray = Array<Trip>();

const paymentArray = Array<Payment>();

const routeArray = Array<Route>();

/**
 * Creates a new User and adds it to the userArray
 * @param uId the id of the specific User
 * */
function createUser(pId: string) {
  const newUser = new User(
    pId,
    getUserData(pId)[0],
    getUserData(pId)[1],
    Number(getUserData(pId)[2]),
    getUserData(pId)[3]
  );
  userArray.push(newUser);
}

/**
 * Creates a new Company and adds it to the companyArray
 * @param cId the id of the specific Company
 * */
function createCompany(cId: string) {
  const newCompany = new Company(cId, getCompanyData(cId)[0]);
  companyArray.push(newCompany);
}

/**
 * Creates a new trip and adds it to the tripArray.
 * @param cId the id of the specific Trip
 * */
function createTrip(tId: string) {
  const newTrip = new Trip(
    tId,
    getTripData(tId)[0],
    getTripData(tId)[1],
    getTripData(tId)[2],
    getTripData(tId)[3],
    Number(getTripData(tId)[5]),
    getTripData(tId)[6],
    getTripData(tId)[7],
    vehicleArray[getPosFromId(tId)],
    userArray[getPosFromId(tId)],
    paymentArray[getPosFromId(tId)],
    routeArray[getPosFromId(tId)]
  );
  tripArray.push(newTrip);
}

/**
 * Creates a new Vehicle and adds it to the vehicleArray
 * @param vId the id of the specific vehicle
 * */
function createVehicle(vId: string) {
  switch (getVehicleData(vId)[0]) {
    case "e-scooter": {
      const vStatus = VehicleStatus.active;
      if (getVehicleData(vId)[4] === "inactive") {
        const vStatus = VehicleStatus.inactive;
      }
      const newEScooter = new EScooter(
        vId,
        getVehicleData(vId)[1],
        companyArray[getPosFromId(vId)],
        Number(getVehicleData(vId)[2]),
        Number(getVehicleData(vId)[3]),
        vStatus,
        Number(getVehicleData(vId)[5])
      );
      vehicleArray.push(newEScooter);
      break;
    }
    default: {
      break;
    }
  }
}

/**
 * Creates a new Payment and adds it to the paymentArray
 * @param vId the id of the specific payment
 * */
function createPayment(pId: string) {
  switch (getPaymentData(pId)[2]) {
    case "Credit Card": {
      const pDate = new Date(getPaymentData(pId)[5]);
      const newCreditCard = new CreditCard(
        pId,
        getPaymentData(pId)[0],
        tripArray[getPosFromId(pId)],
        getPaymentData(pId)[2],
        Number(getPaymentData(pId)[3]),
        Number(getPaymentData(pId)[4]),
        pDate,
        PaymentType.online
      );
      paymentArray.push(newCreditCard);
      break;
    }
    default: {
      break;
    }
  }
}
