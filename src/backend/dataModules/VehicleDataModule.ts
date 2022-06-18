import { EScooter, Train, type DataField, type Vehicle } from "../dataFields";
import {
  EScooterDataFieldNames,
  TrainDataFieldNames,
  type UserDataFieldNames,
} from "./dataFieldNames";
import { DataModule } from "./DataModule";
import { DataPackage } from "./DataPackage";

/**
 * The DataModule of a specific User.
 */
export class VehicleDataModule extends DataModule {
  vehicleDataFieldNames: string[] = [];
  constructor(vehicle: Vehicle) {
    super(vehicle);
  }
  createDataPackages(vehicle: Vehicle): DataPackage[] {
    const vehiclePropertyNames = Object.keys(vehicle);
    const allVehicleDataPackages: DataPackage[] = [];
    if (vehicle instanceof EScooter) {
      this.vehicleDataFieldNames = Object.keys(EScooterDataFieldNames);
    } else vehicle instanceof Train;
    {
      this.vehicleDataFieldNames = Object.keys(TrainDataFieldNames);
    }
    for (let i = 0; i < vehiclePropertyNames.length; i++) {
      for (let j = 0; j < this.vehicleDataFieldNames.length; j++) {
        if (vehiclePropertyNames[i] === this.vehicleDataFieldNames[j]) {
          //Create DataPackage
          const dataPackage = new DataPackage(
            Object.values(this.vehicleDataFieldNames)[j],
            Object.values(vehicle)[i]
          );
          allVehicleDataPackages.push(dataPackage);
        }
      }
    }
    return allVehicleDataPackages;
  }
}
