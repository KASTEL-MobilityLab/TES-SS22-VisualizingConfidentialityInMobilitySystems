import type { DataField } from "../dataFields";
import type { DataPackage } from "./DataPackage";
import type { RiskManager } from "../RiskManager";
import type { Role } from "../roles";

/**
 * Class that contains all the DataPackage that can be dispalyed in the DataViewer after clicking on an icon in the user interface.
 * A DataModule can be created either for a trip after clicking on driven trip or for a vehicle that is currently not active.
 */
export abstract class DataModule {
  id: string;
  dataPackages: DataPackage[];

  /**
   * Construct a new DataModule.
   * @param dataPackages The DataPackages that form a new DataModule.
   */
  constructor(
    id: string,
    dataField: DataField,
    riskManager: RiskManager,
    currentRole: Role
  ) {
    this.id = id;
    this.dataPackages = this.createDataPackages(
      dataField,
      riskManager,
      currentRole
    );
  }

  /**
   * Creates the specific DataPackages to particular DataField.
   * @param dataField The DataField to which DataPackages need to be created.
   */
  abstract createDataPackages(
    dataField: DataField,
    riskManager: RiskManager,
    currentRole: Role
  ): DataPackage[];

  checkValidity() {
    //TODO: To be implemented
  }
}
