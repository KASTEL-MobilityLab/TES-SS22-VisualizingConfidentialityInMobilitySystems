import type { DataField } from "../dataFields";
import type { DataPackage } from "./DataPackage";
import type { RiskManager } from "../RiskManager";
import type { Role } from "../roles";

/**
 * Class that contains all the DataPackage that can be dispalyed in the DataViewer after clicking on an icon in the user interface.
 * A DataModule can be created either for a trip after clicking on driven trip or for a vehicle that is currently not active.
 */
export abstract class DataModule {
  dataPackages: DataPackage[];

  /**
   * Construct a new DataModule.
   * @param dataPackages The DataPackages that form a new DataModule.
   */
  constructor(dataField: DataField) {
    this.dataPackages = this.createDataPackages(dataField);
  }

  /**
   * Creates the specific DataPackages to particular DataField.
   * @param dataField The DataField to which DataPackages need to be created.
   */
  abstract createDataPackages(dataField: DataField): DataPackage[];

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  checkValidity() {
    //TODO: To be implemented
  }
}
