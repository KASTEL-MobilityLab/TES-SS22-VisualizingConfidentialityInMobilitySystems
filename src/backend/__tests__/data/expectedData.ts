import {
  Cash,
  Company,
  CreditCard,
  EScooter,
  Payment,
  PayPal,
  Route,
  Train,
  Trip,
  User,
  Vehicle,
} from "@/backend/dataFields";
import { VehicleStatus } from "@/backend/dataFields/types";
import { RiskDefinition } from "@/backend/riskManager/RiskDefinition";
import { RiskLevel } from "@/backend/riskManager/RiskLevel";
import { Role } from "@/backend/roles";
import { LatLng } from "@/backend/utils/LatLng";

/**
 * Manually defines the expected data.
 *
 * Note: The Order of the data inside each array is important.
 * It must match the order, in which the DataLoader pushes the elements to the data array.
 * Example: In payments, the order must be: all Cash, then all CreditCard, then all PayPal.
 */

/**
 * Manually sets the references of each data field (inplace).
 */
export function setReferences(
  vehicles: Vehicle[],
  trips: Trip[],
  payments: Payment[]
) {
  // vehicles
  vehicles[0].company = companies[0];
  vehicles[1].company = companies[1];

  // trips
  trips[0].payment = payments[0];
  trips[0].vehicle = vehicles[0];
  trips[0].user = users[0];
  trips[0].route = routes[0];
  trips[1].payment = payments[1];
  trips[1].vehicle = vehicles[1];
  trips[1].user = users[1];
  trips[1].route = routes[1];

  // payments
  payments[0].trip = trips[0];
  payments[1].trip = trips[1];
}

export const companies: Company[] = [
  new Company("C01", "Fire Runner"),
  new Company("C02", "Voi"),
];

export const payments: Payment[] = [
  new Cash("P03", "T03"),
  new CreditCard(
    5568404992412103,
    632,
    new Date("2026-4-01"),
    "Mastercard",
    "P01",
    "T01"
  ),
  new PayPal("Tom_Fritz1824", "P02", "T02"),
];
export const users: User[] = [
  new User(
    "U01",
    "Theo",
    "Schweitzer",
    49188323232,
    "theo.schweitzer@gmail.com"
  ),
  new User(
    "U02",
    "Miriam",
    "Lewerentz",
    49732784425,
    "miriam.lewerentz@gmail.com"
  ),
];
export const routes: Route[] = [
  new Route(
    "R01",
    new LatLng(49.007578, 8.38937),
    new LatLng(49.011074, 8.413184)
  ),
  new Route(
    "R02",
    new LatLng(49.014439, 8.390794),
    new LatLng(49.011218, 8.407751)
  ),
];
export const trips: Trip[] = [
  new Trip(
    "T01",
    "R01",
    "V01",
    "U01",
    "P01",
    27.45,
    2.6,
    new Date("2022-05-25T13:06:04Z"),
    new Date("2022-05-25T13:08:04Z")
  ),
  new Trip(
    "T02",
    "R02",
    "V02",
    "U02",
    "P02",
    20.32,
    10,
    new Date("2022-05-25T15:04:04Z"),
    new Date("2022-05-25T15:22:20Z")
  ),
];
export const risks: RiskDefinition[] = [
  new RiskDefinition("PaymentType", RiskLevel.low, [Role.company, Role.user]),
  new RiskDefinition("PaymentProvider", RiskLevel.high, [
    Role.company,
    Role.city,
  ]),
];
export const vehicles: Vehicle[] = [
  new EScooter("V01", "C01", 84, 89, VehicleStatus.active, 74),
  new Train("V02", "C02", VehicleStatus.inactive),
];
