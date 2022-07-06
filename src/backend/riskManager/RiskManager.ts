import type { DataType } from "../DataType";
import type { Role } from "../Role";
import type { Risk } from "./Risk";
import type { RiskExplanation } from "./RiskExplanation";
import type { RiskLevel } from "./RiskLevel";

/**
 * The riskManager class.
 * */
export class RiskManager {
  risks?: Risk[];

  constructor(risks?: Risk[]) {
    this.risks = risks;
  }

  /**
   * Returns the correct Risk instance in the array.
   *
   * Checks whether the array of Risks has been set already
   * and then tries to find the correct instance. If none is found or the
   * array is not initialized yet, it throws an error.
   *
   * @param dataType the string of the DataType
   */
  findRisk(dataType: DataType) {
    if (!this.risks) {
      throw Error("RiskDefinitions are not set yet");
    }
    const riskDef = this.risks.find((element) => element.dataType === dataType);
    if (!riskDef) {
      throw Error("Cannot find RiskDefinition for datatype: " + dataType);
    }
    return riskDef;
  }

  /**
   * Returns the risk of a dataType (low, medium or high)
   * @param dataType the type of the specific data
   * @returns low, medium or high
   * */
  getRiskLevel(dataType: DataType): RiskLevel {
    return this.findRisk(dataType).riskLevel;
  }

  /**
   * Returns true if data is visible in the specified role and false otherwise
   *
   * @param dataType the type of the specific data
   * @returns boolean with the visibility
   */
  getVisibility(dataType: DataType, role: Role): boolean {
    const riskDef = this.findRisk(dataType);
    return riskDef.isVisible(role);
  }

  /**
   * Returns a RiskExplanation with detailed information about a specific data type.
   *
   * @param dataType the type of the specific data
   * @returns a sting with detailed infos
   * */
  getRiskExplanation(dataType: DataType): RiskExplanation {
    const riskDef = this.findRisk(dataType);
    const explanation = riskDef.explanation;
    if (!explanation) {
      throw Error("No RiskExplanation found for dataType: " + dataType);
    }
    return explanation;
  }
}
