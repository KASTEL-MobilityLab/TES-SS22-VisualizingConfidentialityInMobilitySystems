import type { DataField } from "../dataFields";

export class DataModule {
  displayedData: any;
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
        this.displayedData[propertyNames[i].toUpperCase()] = propertyValues[i];
      }
    }
  }
}
