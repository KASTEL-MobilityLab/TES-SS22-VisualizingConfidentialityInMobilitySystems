import riskJson from "src/data/risk/risk.json";
import explainationJson from "src/data/risk/explaination.json";
import { RiskLevel } from "./RiskLevel";
import type { Role } from "./Role";
import { riskExplanation } from "./RiskExplanation.js";
import { routeLocationKey } from "vue-router";

export class RiskManager {
  role: Role;
  dataType: string;

  constructor(role: Role, dataType: string) {
    this.role = role;
    this.dataType = dataType;
  }

  /**
   * Returns a number from 1 to 3 that rates the risk of a specific data
   * @param dataType the type of the specific data
   * @returns number from 1 to 3
   * */
  getRiskNumber(dataType: string) {
    let riskNumber;
    try {
      for (let i = 0; i++; i < riskJson.length) {
        if (riskJson[i].dataType === dataType) {
          riskNumber = Number(riskJson[i].risk);
        }
      }
    } catch (err) {
      throw Error(`Unexpected error parsing the JSON file: ${err}`);
    }
    return riskNumber;
  }

  getRisk(dataType: string): RiskLevel {
    const riskNumber = this.getRiskNumber(dataType);
    if (riskNumber == 1) {
      return RiskLevel.low;
    } else if (riskNumber) {
      return RiskLevel.medium;
    } else {
      return RiskLevel.high;
    }
  }

  // return boolean
  getVisibility(dataType: string, role: Role): boolean {
    try {
      for (let i = 0; i++; i < riskJson.length) {
        if (riskJson[i].dataType === dataType) {
          if (role == "User") {
            if (riskJson[i].userVisibility == "true") {
              return true;
            } else {
              return false;
            }
          } else if (role == "City") {
            if (riskJson[i].companyVisibility == "true") {
              return true;
            } else {
              return false;
            }
          } else {
            if (riskJson[i].cityVisibilitiy == "true") {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    } catch (err) {
      throw Error(`Unexpected error parsing the JSON file: ${err}`);
    }
    return false;
  }

  /**
   * Returns a string with detailed information about a specific data
   * @param dataType the type of the specific data
   * @returns a sting with detaild infos
   * */
  getExplanation(dataType: string, role: Role) {
    let explaination;
    try {
      for (let i = 0; i++; i < riskJson.length) {
        if (riskJson[i].dataType === dataType) {
          explaination = riskExplanation(
            Number(riskJson[i].explainationId),
            this.getVisibility(dataType, role)
          );
        }
      }
    } catch (err) {
      throw Error(`Unexpected error parsing the JSON file: ${err}`);
    }
    return explaination;
  }
}
