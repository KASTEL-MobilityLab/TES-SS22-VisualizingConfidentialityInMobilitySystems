import companiesJson from "src/data/companies.json";
import paymentsJson from "src/data/payments.json";
import routesJson from "src/data/routes.json";
import tripsJson from "src/data/trips.json";
import usersJson from "src/data/users.json";
import vehiclesJson from "src/data/vehicles.json";

/**
 * Returns an array with the name of the company.
 * @param cId the id of the specific company
 * @returns array of Strings
 * */
export function getCompanyData(cId: string) {
  const dataArray = [companiesJson[getPosFromId(cId)].name];
  return dataArray;
}

/**
 * Returns an array with the tripId, type, provider, cardnumber, ccv and expiryDate for the specific payment
 * @param pId the id of the specific payment
 * @returns array of Strings
 * */
export function getPaymentData(pId: string) {
  const dataArray = [
    paymentsJson[getPosFromId(pId)].tripId,
    paymentsJson[getPosFromId(pId)].type,
    paymentsJson[getPosFromId(pId)].provider,
    paymentsJson[getPosFromId(pId)].cardNumber,
    paymentsJson[getPosFromId(pId)].ccv,
    paymentsJson[getPosFromId(pId)].expiryDate,
  ];
  return dataArray;
}

/**
 * Returns an array with the starting lat and lng and ending lat and lnd of the specific route.
 * @param rId the id of the specific route
 * @returns array of Strings
 * */
export function getRouteData(rId: string) {
  const dataArray = [
    routesJson[getPosFromId(rId)].start.lat,
    routesJson[getPosFromId(rId)].start.lng,
    routesJson[getPosFromId(rId)].end.lat,
    routesJson[getPosFromId(rId)].end.lng,
  ];
  return dataArray;
}

/**
 * Returns an array with the routeId, vehicleId, userId, paymentId, avgSpeed, price, startTime and endTime of the specific trip.
 * @param tId the id of the specific trip
 * @returns array of Strings
 * */
export function getTripData(tId: string) {
  const dataArray = [
    tripsJson[getPosFromId(tId)].routeId,
    tripsJson[getPosFromId(tId)].vehicleId,
    tripsJson[getPosFromId(tId)].userId,
    tripsJson[getPosFromId(tId)].paymentId,
    tripsJson[getPosFromId(tId)].avgSpeed,
    tripsJson[getPosFromId(tId)].price,
    tripsJson[getPosFromId(tId)].startTime,
    tripsJson[getPosFromId(tId)].endTime,
  ];
  return dataArray;
}

/**
 * Returns an array with the forename, surname, phoneNumber and email of the specific user.
 * @param uId the id of the specific user
 * @returns array of Strings
 * */
export function getUserData(uId: string) {
  const dataArray = [
    usersJson[getPosFromId(uId)].forename,
    usersJson[getPosFromId(uId)].surname,
    usersJson[getPosFromId(uId)].phoneNumber,
    usersJson[getPosFromId(uId)].email,
  ];
  return dataArray;
}

/**
 * Returns an array with the type, companyId, condition, batteryCondition, status and batteryLevel of the specific Vehicle.
 * @param vId the id of the specific Vehicle
 * @returns array of Strings
 * */
export function getVehicleData(vId: string) {
  const dataArray = [
    vehiclesJson[getPosFromId(vId)].type,
    vehiclesJson[getPosFromId(vId)].companyId,
    vehiclesJson[getPosFromId(vId)].condition,
    vehiclesJson[getPosFromId(vId)].batteryCondition,
    vehiclesJson[getPosFromId(vId)].status,
    vehiclesJson[getPosFromId(vId)].batteryLevel,
  ];
  return dataArray;
}

export function getPosFromId(id: string) {
  const posString = id.substring(1, 10);
  return Number(posString) - 1;
}
