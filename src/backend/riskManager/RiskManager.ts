import riskJson from "src/data/risk/risk.json";
import { RiskLevel } from "./RiskLevel";
import type { Role } from "../Role";
import { RiskDefinition } from "./RiskDefinition";

/**
 * The riskManager class.
 * */
export class RiskManager {
  role: Role;
  dataType: string;

  constructor(role: Role, dataType: string) {
    this.loadAllRiskDefinitions;
    this.role = role;
    this.dataType = dataType;
  }

  riskDefinitions!: RiskDefinition[];

  /**
   * Returns the risk of a dataType (low, medium or high)
   * @param dataType the type of the specific data
   * @returns low, medium or high
   * */
  getRisk(dataType: string): RiskLevel {
    try {
      const index = this.riskDefinitions.findIndex(
        (element) => element.dataType == dataType
      );
      return this.riskDefinitions[index].risk;
    } catch (err) {
      throw Error(`Can not find this dataType: ${err}`);
    }
  }

  /**
   * Returns true if data is visible and false otherwise
   * @param dataType the type of the specific data
   * @returns boolean wtih the visibility
   * */
  getVisibility(dataType: string, role: Role): boolean {
    try {
      const index = this.riskDefinitions.findIndex(
        (element) => element.dataType == dataType
      );
      if (role == "User") {
        return this.riskDefinitions[index].userVisibility;
      } else if (role == "Company") {
        return this.riskDefinitions[index].companyVisibility;
      } else {
        return this.riskDefinitions[index].cityVisibility;
      }
    } catch (err) {
      throw Error(`Can not find this dataType: ${err}`);
    }
  }

  /**
   * Returns a string with detailed information about a specific data
   * @param dataType the type of the specific data
   * @returns a sting with detaild infos
   * */
  getExplanation(dataType: string, role: Role): string {
    try {
      const index = this.riskDefinitions.findIndex(
        (element) => element.dataType == dataType
      );
      if (this.getVisibility(dataType, role)) {
        return this.riskDefinitions[index].visibleExplanation;
      } else {
        return this.riskDefinitions[index].notVisibleExplanation;
      }
    } catch (err) {
      throw Error(`Can not find this dataType: ${err}`);
    }
  }

  /**
   * Loads the data of the riskJson in an Array of RiskDefinitions.
   * */
  private loadAllRiskDefinitions(): void {
    try {
      for (let i = 0; i < riskJson.length; i++) {
        const dataType = riskJson[i].dataType;
        let risk = RiskLevel.low;
        if (riskJson[i].risk == "medium") {
          risk = RiskLevel.medium;
        } else if (riskJson[i].risk == "high") {
          risk = RiskLevel.high;
        }
        let userVisibility = false;
        if (riskJson[i].userVisibility == "true") {
          userVisibility = true;
        }
        let companyVisibility = false;
        if (riskJson[i].companyVisibility == "true") {
          companyVisibility = true;
        }
        let cityVisibility = false;
        if (riskJson[i].cityVisibilitiy == "true") {
          cityVisibility = true;
        }
        const visibleExplanation = riskJson[i].visible;
        const notVisibleExplanation = riskJson[i].notVisible;
        const riskDefinition = new RiskDefinition(
          dataType,
          risk,
          userVisibility,
          companyVisibility,
          cityVisibility,
          visibleExplanation,
          notVisibleExplanation
        );
        this.riskDefinitions.push(riskDefinition);
      }
    } catch (err) {
      throw Error(`Soething went wrong reading the JSON: ${err}`);
    }
  }
}
