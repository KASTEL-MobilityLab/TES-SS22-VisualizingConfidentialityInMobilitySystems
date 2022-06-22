import type { i18n } from "@/i18n";

/**
 * Enum that defines every data type that can be assigned.
 */

export enum DataType {
  //TODO: Abändern auf das neue Format
  PaymentType = "PaymentType",
  //DataTypes of the user
  Forename = "data.user.forename",
  Surname = "data.user.surname",
  PhoneNumber = "data.user.phoneNumber",
  Email = "data.user.email",
}
