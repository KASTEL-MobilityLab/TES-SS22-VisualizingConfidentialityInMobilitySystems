export{};
import {getCompanyData, getPaymentData, getRouteData, getTripData, getUserData, getVehicleData, getPosFromId} from 'src/backend/DataLoader.js';
import {Company} from './dataFields/Company';
import type {Vehicle} from './dataFields/Vehicle';
import {User} from './dataFields/User';
import {EScooter} from './dataFields/vehicles/EScooter';
import {VehicleStatus } from "./dataFields/types";

var userArray = Array<User>();

var companyArray = Array<Company>();

var vehicleArray = Array<Vehicle>();

/**
 * Creates a new User and adds it to the userArray
 * @param uId the id of the specific User
 * */
function createUser(pId: string) {
    let newUser = new User(pId, getUserData(pId)[0], getUserData(pId)[1], Number(getUserData(pId)[2]), getUserData(pId)[3]);
    userArray.push(newUser);
};

/**
 * Creates a new Company and adds it to the companyArray
 * @param cId the id of the specific Company
 * */
function createCompany(cId: string) {
    let newCompany = new Company(cId, getCompanyData(cId)[0]);
    companyArray.push(newCompany);
};

/**
 * Creates a new Vehicle and adds it to the vehicleArray
 * @param vId the id of the specific vehicle
 * */
function createVehicle(vId: string) {
    switch(getVehicleData(vId)[0]) {
        case "e-scooter": {
            let vStatus = VehicleStatus.active
            if (getVehicleData(vId)[4] === "inactive") {
                let vStatus = VehicleStatus.inactive
            }
            let vType = VehicleStatus;
            const newEScooter = new EScooter(vId, getVehicleData(vId)[1], companyArray[getPosFromId(vId)],
            Number(getVehicleData(vId)[2]), Number(getVehicleData(vId)[3]), vStatus, Number(getVehicleData(vId)[5]));
            vehicleArray.push(newEScooter);
            break;
        }
        default: {
            break;
        }
    };
}