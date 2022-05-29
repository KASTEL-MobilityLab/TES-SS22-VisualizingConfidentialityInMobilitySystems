/**
 * Vehicle Type defines the specific types of a Vehicle (e.g. E-Scooter)
 */
export enum VehicleType {
  escooter = "E-Scooter",
  bike = "Bicycle",
  train = "Train",
}

/**
 * VehicleStatus specifies whether a given Vehicle is currently being used (active)
 * or not (inactive).
 */
export enum VehicleStatus {
  active = "Active",
  inactive = "Inactive",
}

/**
 * PaymentType specifies, whether a given Payment was made Online or offline.
 */
export enum PaymentType {
  offline = "Offline",
  online = "Online",
}
