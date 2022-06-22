import type { DataField } from "../dataFields";
import type { RiskManager } from "../riskManager/RiskManager";

/**
 * The DataModule class that stores all the data that is displayed in the DataViewer. Additionally, the risk of every data is stored
 * and assigned to the specific data.
 */
export class DataModule {
  public static readonly PREFIX_OF_NON_DISPLAYED_DATA = "_";
  //Stores the data that is shown to the user
  public displayedData: Record<string, string>;
  //Stores the risks of the shown data
  public risks: Record<string, string>;
  private excludedProperties = ["id", "type"];

  constructor(dataField: DataField, riskManager: RiskManager) {
    this.displayedData = this.assignDataFieldToDisplayedData(dataField);
    this.risks = this.assignRiskToDisplayedData(dataField, riskManager);
  }

  assignDataFieldToDisplayedData(dataField: DataField): Record<string, string> {
    const propertyNames = Object.keys(dataField);
    const propertyValues = Object.values(dataField);
    this.displayedData = {};
    for (let i = 0; i < propertyNames.length; i++) {
      if (
        !propertyNames[i].startsWith(DataModule.PREFIX_OF_NON_DISPLAYED_DATA) &&
        !this.excludedProperties.includes(propertyNames[i])
      ) {
        this.displayedData[propertyNames[i]] = propertyValues[i];
      }
    }
    return this.displayedData;
  }
  assignRiskToDisplayedData(
    dataField: DataField,
    riskManager: RiskManager
  ): Record<string, string> {
    const propertyNames = Object.keys(dataField);
    this.risks = {};
    for (let i = 0; i < propertyNames.length; i++) {
      if (
        !propertyNames[i].startsWith(DataModule.PREFIX_OF_NON_DISPLAYED_DATA) &&
        !this.excludedProperties.includes(propertyNames[i])
      ) {
        this.risks[propertyNames[i]] = riskManager.getRiskLevel(
          propertyNames[i]
        );
      }
    }
    return this.risks;
  }
}
