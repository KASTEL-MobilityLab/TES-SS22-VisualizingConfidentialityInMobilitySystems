import {
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
import { DataType } from "@/backend/DataType";
import { Risk } from "@/backend/riskManager/Risk";
import { RiskLevel } from "@/backend/riskManager/RiskLevel";
import { Role } from "@/backend/Role";
import { LatLng } from "@/backend/utils/LatLng";
import { explanations } from "./expectedExplanations";

/**
 * Manually defines the expected data.
 *
 * Note: The Order of the data inside each array is important.
 * It must match the order, in which the DataLoader pushes the elements to the data array.
 * Example: In payments, the order must be: all Cash, then all CreditCard, then all PayPal.
 */

export const companies: Company[] = [
  new Company("C01", "Fire Runner"),
  new Company("C02", "Voi"),
];

export const payments: Payment[] = [
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
  new Route(
    "R03",
    new LatLng(49.02054068485777, 8.379907608032228),
    new LatLng(49.01333822182982, 8.404026031494142),
    [
      new LatLng(49.02054068485777, 8.379907608032228),
      new LatLng(49.01333822182982, 8.404026031494142),
    ],
    "test"
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
    new Date("2022-05-25T13:06:04"),
    new Date("2022-05-25T13:08:04")
  ),
  new Trip(
    "T02",
    "R02",
    "V02",
    "U02",
    "P02",
    20.32,
    10,
    new Date("2022-05-25T15:04:04"),
    new Date("2022-05-25T15:22:20")
  ),
];
export const risks: Risk[] = [
  new Risk(
    DataType.UserForename,
    RiskLevel.Low,
    [Role.Company, Role.User],
    explanations[0]
  ),
  new Risk(
    DataType.UserSurname,
    RiskLevel.Low,
    [Role.Company, Role.User],
    explanations[1]
  ),
  new Risk(
    DataType.UserPhoneNumber,
    RiskLevel.Medium,
    [Role.Company, Role.User],
    explanations[2]
  ),
  new Risk(
    DataType.UserEmail,
    RiskLevel.Medium,
    [Role.Company, Role.User],
    explanations[3]
  ),
];
export const vehicles: Vehicle[] = [
  new EScooter("V01", "C01", 84, 89, VehicleStatus.Active, 74),
  new Train("V02", "C02", VehicleStatus.Inactive),
];
