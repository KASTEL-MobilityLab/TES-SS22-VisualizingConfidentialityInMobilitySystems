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

/**
 * ElectricLockStatus specifies whether a given Vehicle has an eletric lock or not
 * or not (inactive).
 */
export enum ElectricLockStatus {
  Yes = "Yes",
  No = "No",
}
