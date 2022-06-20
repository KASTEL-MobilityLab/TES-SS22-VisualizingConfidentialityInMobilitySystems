import type { Role } from "../roles";
import type { RiskDefinition } from "./RiskDefinition";
import type { RiskExplanation } from "./RiskExplanation";
import type { RiskLevel } from "./RiskLevel";

/**
 * The riskManager class.
 * */
export class RiskManager {
  role: Role;
  riskDefinitions?: RiskDefinition[];

  constructor(role: Role, riskDefinitions?: RiskDefinition[]) {
    this.role = role;
    this.riskDefinitions = riskDefinitions;
  }

  /**
   * Returns the correct RiskDefinition instance in the array.
   *
   * Checks whether the array of RiskDefinitions has been set already
   * and then tries to find the correct instance. If none is found or the
   * array is not initialized yet, it throws an error.
   *
   * @param dataType the string of the DataType
   */
  findRiskDefinition(dataType: string) {
    if (this.riskDefinitions === undefined) {
      throw Error("RiskDefinitions are not set yet");
    }
    const riskDef = this.riskDefinitions.find(
      (element) => element.dataType == dataType
    );
    if (riskDef === undefined) {
      throw Error("Cannot find RiskDefinition for datatype:" + dataType);
    }
    return riskDef;
  }

  /**
   * Returns the risk of a dataType (low, medium or high)
   * @param dataType the type of the specific data
   * @returns low, medium or high
   * */
  getRiskLevel(dataType: string): RiskLevel {
    return this.findRiskDefinition(dataType).riskLevel;
  }

  /**
   * Returns true if data is visible in the specified role and false otherwise
   *
   * @param dataType the type of the specific data
   * @returns boolean with the visibility
   */
  getVisibility(dataType: string, role: Role): boolean {
    const riskDef = this.findRiskDefinition(dataType);
    return riskDef.isVisible(role);
  }

  /**
   * Returns a string with detailed information about a specific data
   * @param dataType the type of the specific data
   * @returns a sting with detailed infos
   * */
  getExplanation(dataType: string, role: Role): RiskExplanation {
    throw Error("Not implemented yet");
  }
}
