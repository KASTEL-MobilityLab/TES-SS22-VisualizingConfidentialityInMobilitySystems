import type { User } from "../dataFields";
import { DataPackage } from "./DataPackage";
import { UserDataFieldNames } from "./dataFieldNames";
import { DataModule } from "./DataModule";

/**
 * The DataModule of a specific User.
 */
export class UserDataModule extends DataModule {
  private static readonly UNDERLINE: string = "_";

  constructor(user: User) {
    super(user);
  }

  /*
  createDataPackages(
    user: User
  ): DataPackage[] {
    //Create DataPackages
    const forenameDataPacakge = new DataPackage(
      UserDataFieldNames.forename,
      user.forename
    );
    const surnameDataPackage = new DataPackage(
      UserDataFieldNames.surname,
      user.surname
    );
    const phoneNumberDataPackage = new DataPackage(
      UserDataFieldNames.phoneNumber,
      user.phoneNumber
    );
    const emailDataPackage = new DataPackage(
      UserDataFieldNames.email,
      user.email
    );
    const allUserDataPackages: DataPackage[] = [
      forenameDataPacakge,
      surnameDataPackage,
      phoneNumberDataPackage,
      emailDataPackage,
    ];

    return allUserDataPackages;
  }
*/
  getFirstUserDataPackage(): DataPackage {
    return this.dataPackages[0];
  }

  /*
  createDataPackages(user: User): DataPackage[] {
    const userPropertyNames = Object.keys(user);
    const userDataFieldNames = Object.keys(UserDataFieldNames);
    const allUserDataPackages: DataPackage[] = [];
    for (let i = 0; i < userPropertyNames.length; i++) {
      for (let j = 0; j < userDataFieldNames.length; j++) {
        if (userPropertyNames[i] === userDataFieldNames[j]) {
          //Create DataPackage
          const dataPackage = new DataPackage(
            Object.values(UserDataFieldNames)[j],
            Object.values(user)[i]
          );
          allUserDataPackages.push(dataPackage);
        }
      }
    }
    return allUserDataPackages;
  }
  */

  createDataPackages(user: User): DataPackage[] {
    const allUserDataPackages: DataPackage[] = [];
    const userPropertyNames = Object.keys(user);
    for (let i = 0; i < userPropertyNames.length; i++) {
      if (userPropertyNames[i].charAt(0) !== UserDataModule.UNDERLINE) {
        const dataPackage = new DataPackage(
          Object.values(userPropertyNames)[i],
          Object.values(user)[i]
        );
        allUserDataPackages.push(dataPackage);
      }
    }
    return allUserDataPackages;
  }
}
