import riskJson from "src/data/risk/risk.json";
import { RiskLevel } from "./RiskLevel";
import type { Role } from "../Role";
import { RiskDefinition } from "./RiskDefinition";
import { plainToInstance } from "class-transformer";
import "reflect-metadata";

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
    const risk = this.riskDefinitions.find(
      (element) => element.dataType == dataType
    )?.risk;
    if (
      risk == RiskLevel.low ||
      risk == RiskLevel.medium ||
      risk == RiskLevel.high
    ) {
      return risk;
    }
    throw Error(`Value for risk is inavlid`);
  }

  /**
   * Returns true if data is visible and false otherwise
   * @param dataType the type of the specific data
   * @returns boolean with the visibility
   * */
  getVisibility(dataType: string, role: Role): boolean {
    const found = this.riskDefinitions.find(
      (element) => element.dataType == dataType
    );
    if (
      (role == "User" && found?.userVisibility) ||
      (role == "Company" && found?.companyVisibility) ||
      (role == "City" && found?.cityVisibility)
    ) {
      return true;
    } else if (
      (role == "User" && !found?.userVisibility) ||
      (role == "Company" && !found?.companyVisibility) ||
      (role == "City" && !found?.cityVisibility)
    ) {
      return false;
    } else {
      throw Error(`Value for visibility is inavlid`);
    }
  }

  /**
   * Returns a string with detailed information about a specific data
   * @param dataType the type of the specific data
   * @returns a sting with detaild infos
   * */
  getExplanation(dataType: string, role: Role): string {
    const found = this.riskDefinitions.find(
      (element) => element.dataType == dataType
    );
    if (
      this.getVisibility(dataType, role) &&
      typeof found?.visibleExplanation === "string"
    ) {
      return found.visibleExplanation;
    } else if (
      !this.getVisibility(dataType, role) &&
      typeof found?.notVisibleExplanation === "string"
    ) {
      return found.notVisibleExplanation;
    } else {
      throw Error(`Value for visibility or explanation is inavlid`);
    }
  }

  private loadAllRiskDefinitions(): void {
    this.riskDefinitions = plainToInstance(RiskDefinition, riskJson);
  }
}
