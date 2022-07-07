import type { DataField } from "../dataFields";
import { DataType } from "../DataType";
import type { Risk } from "../riskManager/Risk";
import { RiskColor } from "../riskManager/RiskColor";
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
  //Stores the risk levels of the shown data
  public riskLevels: Record<string, string>;
  //Stores the risks of the shown data
  public risks: Record<string, Risk>;
  //The excludedProperties contain every property that are not displayed in the DataViewer.
  private excludedProperties = ["id", "type"];

  /**
   * Creates a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @param riskManager The RiskManager that is assigned within the DataManager to manage the risks of the particular DataFields.
   */
  constructor(dataField: DataField, riskManager: RiskManager) {
    this.displayedData = this.assignDataFieldToDisplayedData(dataField);
    this.riskLevels = this.convertRisks(
      this.assignRiskToDisplayedData(dataField, riskManager)
    );
    this.risks = this.assignRiskToDisplayedData(dataField, riskManager);
  }

  /**
   * Method that assignes the properties of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string> with the values of DataType as the keys and the property values of the dataField as values.
   */
  assignDataFieldToDisplayedData(dataField: DataField): Record<string, string> {
    const fieldNames = Object.keys(dataField);
    const values = Object.values(dataField);
    const dataTypes = Object.values(DataType);
    this.displayedData = {};
    fieldNames.forEach((fieldName, index) => {
      // Find specific value within DataType
      dataTypes.forEach((dataType) => {
        if (fieldName === dataType) {
          //Wird als Methode ausgelagert
          if (fieldName === "price") {
            this.displayedData[`data.${fieldName}`] = values[index] + "€";
          } else if (fieldName === "batteryLevel") {
            this.displayedData[`data.${fieldName}`] = values[index] + "%";
          } else {
            this.displayedData[`data.${fieldName}`] = values[index];
          }
        }
      });
    });
    return this.displayedData;
  }

  /**
   * Method that assignes the risk properties values of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string> with the values of DataType as the keys and the risks property values of the dataField as values.
   */
  assignRiskToDisplayedData(
    dataField: DataField,
    riskManager: RiskManager
  ): Record<string, Risk> {
    const fieldNames = Object.keys(dataField);
    const dataTypes = Object.values(DataType);

    this.risks = {};
    for (const fieldName of fieldNames) {
      //Find specific value within DataType
      dataTypes.forEach((dataType) => {
        if (fieldName === dataType) {
          //Statt RiskLevel hier die Risk abspeichern und dann über isVisible prüfen
          this.risks[`data.${fieldName}`] = riskManager.findRisk(dataType);
        }
      });
    }
    return this.risks;
  }

  /**
   * Method that converts the RiskLevel of the displayedData to the specific Bootstrap Riskcolor.
   * @param risks A Record<string, string> with the values of DataType as the keys and the risk property values of the dataField as values.
   * @returns A Record<string, string> with the values of DataType as the keys and the risk color of the property values of the dataField as values.
   */
  convertRisks(risks: Record<string, Risk>): Record<string, string> {
    const fieldNames = Object.keys(risks);
    this.riskLevels = {};
    for (const fieldName of fieldNames) {
      const riskLevel = risks[fieldName].riskLevel;
      switch (riskLevel) {
        case RiskLevel.Low:
          this.riskLevels[fieldName] = RiskColor.Green;
          break;
        case RiskLevel.Medium:
          this.riskLevels[fieldName] = RiskColor.Yellow;
          break;
        case RiskLevel.High:
          this.riskLevels[fieldName] = RiskColor.Red;
          break;
      }
    }
    return this.riskLevels;
  }
}
