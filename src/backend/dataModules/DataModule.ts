import type { DataField } from "../dataFields";

/**
 * The DataModule class that stores all the data that is displayed in the DataViewer. Additionally, the risk of every data is stored
 * and assigned to the specific data.
 */
export class DataModule {
  //DataModule iterable machen ->
  //Stores the data that is shown to the user
  displayedData: any;
  //Stores the risks of the shown data
  risks: any;
  private excludedProperties = ["id", "type"];

  constructor(dataField: DataField) {
    const propertyNames = Object.keys(dataField);
    const propertyValues = Object.values(dataField);
    this.displayedData = {};
    for (let i = 0; i < propertyNames.length; i++) {
      if (
        !propertyNames[i].startsWith("_") &&
        !this.excludedProperties.includes(propertyNames[i])
      ) {
        this.displayedData[propertyNames[i]] = propertyValues[i];
      }
    }
  }

  assignRiskToDisplayedData() {
    //TODO: To be implemented
  }
}
