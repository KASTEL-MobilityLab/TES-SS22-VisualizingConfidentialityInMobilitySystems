/**
 * Vehicle Type defines the specific types of a Vehicle (e.g. E-Scooter).
 */
export enum VehicleType {
  escooter = "E-Scooter",
  bike = "Bicycle",
  train = "Train",
  bus = "Bus",
}

/**
 * VehicleStatus specifies whether a given Vehicle is currently being used (active)
 * or not (inactive).
 */
export enum VehicleStatus {
  active = "Active",
  inactive = "Inactive",
}

export type VehicleStatusString = keyof typeof VehicleStatus;

/**
 * PaymentType specifies with which type of payment the user paid.
 */
export enum PaymentType {
  cash = "Cash",
  creditcard = "Credit Card",
  paypal = "PayPal",
}
