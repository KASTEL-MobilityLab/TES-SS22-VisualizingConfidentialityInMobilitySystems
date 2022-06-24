import type { DataField } from "../dataFields";
import { DataType } from "../dataType";
import { RiskColors } from "../riskManager/riskColors";
import { RiskLevel } from "../riskManager/RiskLevel";
import type { RiskManager } from "../riskManager/RiskManager";

/**
 * The DataModule class that stores all the data that is displayed in the DataViewer. Additionally, the risk of every data is stored
 * and assigned to the specific data.
 */
export class DataModule {
  //A "_" as a prefic of a property of a DataField means that this property is not displayed in the frontend within the DataViewer.
  //Properties without a "_" as a prefix are displayed in the DataViewer.
  public static readonly PREFIX_OF_NON_DISPLAYED_DATA = "_";
  //Stores the data that is shown to the user
  public displayedData: Record<string, string>;
  //Stores the risks of the shown data
  public risks: Record<string, string>;
  //The excludedProperties contain every property that are not displayed in the DataViewer.
  private excludedProperties = ["id", "type"];

  /**
   * Creates a DataMoudle.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @param riskManager The RiskManager that is assigned within the DataManager to manage the risks of the particular DataFields.
   */
  constructor(dataField: DataField, riskManager?: RiskManager) {
    this.displayedData = this.assignDataFieldToDisplayedData(dataField);
    this.risks = this.convertRisks(
      this.assignRiskToDisplayedData(dataField, riskManager)
    );
  }

  /**
   * Method that assignes the properties of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string> with the values of DataType as the keys and the property values of the dataField as values.
   */
  assignDataFieldToDisplayedData(dataField: DataField): Record<string, string> {
    const dataFieldPropertyNames = Object.keys(dataField);
    const dataFieldPropertyValues = Object.values(dataField);
    const dataTypeValues = Object.values(DataType);
    this.displayedData = {};
    for (let i = 0; i < dataFieldPropertyNames.length; i++) {
      if (
        !dataFieldPropertyNames[i].startsWith(
          DataModule.PREFIX_OF_NON_DISPLAYED_DATA
        ) &&
        !this.excludedProperties.includes(dataFieldPropertyNames[i])
      ) {
        const dataTypeValue = dataTypeValues.find(
          (locales) => locales === "data.user." + dataFieldPropertyNames[i]
        );
        if (dataTypeValue != null) {
          this.displayedData[dataTypeValue] = dataFieldPropertyValues[i];
        }
      }
    }
    return this.displayedData;
  }

  /**
   * Method that assignes the risk properties values of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string> with the values of DataType as the keys and the risks property values of the dataField as values.
   */
  assignRiskToDisplayedData(
    dataField: DataField,
    riskManager?: RiskManager
  ): Record<string, string> {
    const propertyNames = Object.keys(dataField);
    const dataTypeValues = Object.values(DataType);
    this.risks = {};
    for (let i = 0; i < propertyNames.length; i++) {
      if (
        !propertyNames[i].startsWith(DataModule.PREFIX_OF_NON_DISPLAYED_DATA) &&
        !this.excludedProperties.includes(propertyNames[i])
      ) {
        const dataTypeValue = dataTypeValues.find(
          (locales) => locales === "data.user." + propertyNames[i]
        );
        if (riskManager !== undefined) {
          if (dataTypeValue != null) {
            this.risks[dataTypeValue] = riskManager.getRiskLevel(
              propertyNames[i]
            );
          }
        }
      }
    }
    return this.risks;
  }

  /**
   * Method that converts the RiskLevel of the displayedData to the specific Bootstrap Riskcolor.
   * @param risks A Record<string, string> with the values of DataType as the keys and the risk property values of the dataField as values.
   * @returns A Record<string, string> with the values of DataType as the keys and the risk color of the property values of the dataField as values.
   */
  convertRisks(risks: Record<string, string>): Record<string, string> {
    const propertyNames = Object.keys(risks);
    for (let i = 0; i < Object.keys(risks).length; i++) {
      if (risks[propertyNames[i]] === RiskLevel.low) {
        risks[propertyNames[i]] = RiskColors.Green;
      } else if (risks[propertyNames[i]] === RiskLevel.medium) {
        risks[propertyNames[i]] = RiskColors.Yellow;
      } else if (risks[propertyNames[i]] === RiskLevel.high) {
        risks[propertyNames[i]] = RiskColors.Red;
      }
    }
    return risks;
  }
}
