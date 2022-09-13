import type { DataField } from "../dataFields";
import { DataType } from "../DataType";
import { getRiskColor } from "../riskManager/RiskColor";
import { RiskLevel } from "../riskManager/RiskLevel";
import type { RiskManager } from "../riskManager/RiskManager";

/**
 * The DataModule class that stores all the data that is displayed in the DataViewer. Additionally, the risk of every data is stored
 * and assigned to the specific data.
 */
export class DataModule {
  //A "_" as a prefix of a property of a DataField means that this property is not displayed in the frontend within the DataViewer.
  //Properties without a "_" as a prefix are displayed in the DataViewer.
  private static readonly PREFIX_OF_DATA_TRANSLATIONS = "data";
  private static readonly SEPARATION_SYMBOL_OF_TRANSLATIONS = ".";
  private static readonly BUTTON_ABBREVIATION = "btn";
  private static readonly BLANK_SPACE = " ";
  private static readonly LINK_BETWEEN_BUTTON_ABBREVIATION = "-";
  //Stores the data that is shown to the user
  public displayedData: Record<string, string | Promise<string>>;
  //Stores the risks of the shown data
  public risks: Record<string, string>;

  /**
   * Creates a DataModule.
   * @param dataField the DataField to whom a DataModule shall be created.
   * @param riskManager the RiskManager that is assigned within the DataManager to manage the risks of the particular DataFields.
   */
  constructor(dataField: DataField, riskManager: RiskManager) {
    this.displayedData = this.assignDataFieldToDisplayedData(dataField);
    this.risks = this.convertRisks(
      this.assignRiskToDisplayedData(dataField, riskManager)
    );
  }

  /**
   * Method that assigns the properties of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string | Promise<string>> with the values of DataType as the keys and the property values of the dataField as values.
   */
  assignDataFieldToDisplayedData(
    dataField: DataField
  ): Record<string, string | Promise<string>> {
    const fieldNames = Object.keys(dataField);
    const values = Object.values(dataField);
    const dataTypes = Object.values(DataType);
    this.displayedData = {};
    fieldNames.forEach((fieldName, index) => {
      // Find specific value within DataType
      const key =
        DataModule.PREFIX_OF_DATA_TRANSLATIONS +
        DataModule.SEPARATION_SYMBOL_OF_TRANSLATIONS +
        `${fieldName}`;
      dataTypes.forEach((dataType) => {
        if (fieldName === dataType) {
          if (fieldName === DataType.TripPrice) {
            this.displayedData[key] = values[index] + "€";
          } else if (fieldName === DataType.VehicleBatteryLevel) {
            this.displayedData[key] = values[index] + "%";
          } else if (fieldName === "expiryDate") {
            this.displayedData[key] = values[index].toLocaleDateString(
              "default",
              {
                month: "long",
                year: "numeric",
              }
            );
          } else if (fieldName === "startTime") {
            this.displayedData[key] = values[index].toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
          } else if (fieldName === "endTime") {
            this.displayedData[key] = values[index].toLocaleTimeString(
              "en-US",
              {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }
            );
          } else {
            this.displayedData[key] = values[index];
          }
        }
      });
    });
    return this.displayedData;
  }

  /**
   * Method that assigns the risk properties values of a DataField to the displayedData of a DataModule.
   * @param dataField The DataField to whom a DataModule shall be created.
   * @returns A Record<string, string> with the values of DataType as the keys and the risks property values of the dataField as values.
   */
  assignRiskToDisplayedData(
    dataField: DataField,
    riskManager: RiskManager
  ): Record<string, string> {
    const fieldNames = Object.keys(dataField);
    const dataTypes = Object.values(DataType);

    this.risks = {};
    for (const fieldName of fieldNames) {
      //Find specific value within DataType
      dataTypes.forEach((dataType) => {
        if (fieldName === dataType) {
          this.risks[
            DataModule.PREFIX_OF_DATA_TRANSLATIONS +
              DataModule.SEPARATION_SYMBOL_OF_TRANSLATIONS +
              `${fieldName}`
          ] = riskManager.getRiskLevel(dataType);
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
  convertRisks(risks: Record<string, string>): Record<string, string> {
    const fieldNames = Object.keys(risks);
    for (const fieldName of fieldNames) {
      const riskLevel = risks[fieldName];
      risks[fieldName] =
        DataModule.BUTTON_ABBREVIATION +
        DataModule.BLANK_SPACE +
        DataModule.BUTTON_ABBREVIATION +
        DataModule.LINK_BETWEEN_BUTTON_ABBREVIATION +
        `${getRiskColor(RiskLevel[riskLevel as keyof typeof RiskLevel])}`;
    }
    return risks;
  }
}
