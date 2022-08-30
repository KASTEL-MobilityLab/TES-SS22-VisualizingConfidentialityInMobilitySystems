/**
 * Enum that defines every data type that can be assigned.
 */
export enum DataType {
  //User
  UserForename = "forename",
  UserSurname = "surname",
  UserPhoneNumber = "phoneNumber",
  UserEmail = "email",
  //Vehicle
  VehicleType = "vehicleType",
  VehicleStatus = "status",
  VehicleBatteryLevel = "batteryLevel",
  VehicleOwnerName = "ownerName",
  VehicleCurrentPosition = "currentPosition",
  VehicleLicensePlate = "licensePlate",
  VehicleElectric = "electric",
  VehicleElectricLock = "electricLock",
  VehicleColor = "color",
  VehicleNumPassengers = "numPassengers",
  //Trip
  TripStartTime = "startTime",
  TripEndTime = "endTime",
  TripAverageSpeed = "averageSpeed",
  TripPrice = "price",
  //Payment
  PaymentType = "paymentType",
  PaymentCardNumber = "cardNumber",
  PaymentCcv = "ccv",
  PaymentExpiryDate = "expiryDate",
  PaymentProvider = "provider",
  PaymentUsername = "userName",
}
