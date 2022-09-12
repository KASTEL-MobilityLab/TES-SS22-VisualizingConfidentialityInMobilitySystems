/**
 * Vehicle Type defines the specific types of a Vehicle (e.g. E-Scooter).
 */
export enum VehicleType {
  EScooter = "E-Scooter",
  Bike = "Bicycle",
  Train = "Train",
  Bus = "Bus",
  Taxi = "Taxi",
  SharedCar = "Shared Car",
}

/**
 * VehicleStatus specifies whether a given Vehicle is currently being used (active)
 * or not (inactive).
 */
export enum VehicleStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export type LicensePlate = `${string}-${string}-${number}`;
/**
 * PaymentType specifies with which type of payment the user paid.
 */
export enum PaymentType {
  Cash = "Cash",
  CreditCard = "Credit Card",
  PayPal = "PayPal",
}

export type Id = VehicleId | CompanyId | TripId | PaymentId | UserId | RouteId;
export const VEHICLE_ID_PREFIX = "V";
export const COMPANY_ID_PREFIX = "C";
export const TRIP_ID_PREFIX = "T";
export const PAYMENT_ID_PREFIX = "P";
export const USER_ID_PREFIX = "U";
export const ROUTE_ID_PREFIX = "R";
export type VehicleId = `${typeof VEHICLE_ID_PREFIX}${number}`;
export type CompanyId = `${typeof COMPANY_ID_PREFIX}${number}`;
export type TripId = `${typeof TRIP_ID_PREFIX}${number}`;
export type PaymentId = `${typeof PAYMENT_ID_PREFIX}${number}`;
export type UserId = `${typeof USER_ID_PREFIX}${number}`;
export type RouteId = `${typeof ROUTE_ID_PREFIX}${number}`;
