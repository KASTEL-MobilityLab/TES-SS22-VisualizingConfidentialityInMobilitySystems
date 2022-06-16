import type { User } from "../dataFields";
import { DataPackage } from "./DataPackage";
import type { RiskManager } from "../RiskManager";
import type { Role } from "../roles";
import { UserDataFieldNames } from "./dataFieldNames";
import { DataModule } from "./DataModule";

/**
 * The DataModule of a specific User.
 */
export class UserDataModule extends DataModule {
  constructor(
    id: string,
    user: User,
    riskManager: RiskManager,
    currentRole: Role
  ) {
    super(id, user, riskManager, currentRole);
  }

  createDataPackages(
    user: User,
    riskManager: RiskManager,
    currentRole: Role
  ): DataPackage[] {
    //Create DataPackages
    //Preliminary implementation with DataType as Magic Strings within RiskManager methods
    //Ich glaube, dass es besser wäre, wenn wir den Datentyp nicht mit einem relativ langen String definieren, sondern unter Umsäntnden
    //als eigene Enums für Vehicle, User, Payment, Trip, ... . Was hält ihr davon?
    const forenameDataPacakge = new DataPackage(
      UserDataFieldNames.forename,
      user.forename,
      riskManager.getExplanation("UserForename", currentRole),
      riskManager.getVisibility("UserForename", currentRole)
    );
    const surnameDataPackage = new DataPackage(
      UserDataFieldNames.surname,
      user.surname,
      riskManager.getExplanation("UserSurname", currentRole),
      riskManager.getVisibility("UserSurname", currentRole)
    );
    const phoneNumberDataPackage = new DataPackage(
      UserDataFieldNames.phoneNumber,
      user.phoneNumber,
      riskManager.getExplanation("UserPhoneNumber", currentRole),
      riskManager.getVisibility("UserPhoneNumber", currentRole)
    );
    const emailDataPackage = new DataPackage(
      UserDataFieldNames.email,
      user.email,
      riskManager.getExplanation("UserEmail", currentRole),
      riskManager.getVisibility("UserEmail", currentRole)
    );
    const allUserDataPackages: [
      DataPackage,
      DataPackage,
      DataPackage,
      DataPackage
    ] = [
      forenameDataPacakge,
      surnameDataPackage,
      phoneNumberDataPackage,
      emailDataPackage,
    ];

    return allUserDataPackages;
  }
}
