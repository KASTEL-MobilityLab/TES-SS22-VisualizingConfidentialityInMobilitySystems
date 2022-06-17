import { RiskLevel } from "./RiskLevel.js";

/**
 * The riskDefinition class.
 */
export class RiskDefinition {
  dataType: string;
  risk: RiskLevel;
  userVisibility: boolean;
  companyVisibility: boolean;
  cityVisibility: boolean;
  visibleExplanation: string;
  notVisibleExplanation: string;

  constructor(
    dataType: string,
    riskStrig: string,
    userVisibility: boolean,
    companyVisibility: boolean,
    cityVisibility: boolean,
    visibleExplanation: string,
    notVisibleExplanation: string
  ) {
    this.dataType = dataType;
    this.risk = this.getRisk(riskStrig);
    this.userVisibility = userVisibility;
    this.companyVisibility = companyVisibility;
    this.cityVisibility = cityVisibility;
    this.visibleExplanation = visibleExplanation;
    this.notVisibleExplanation = notVisibleExplanation;
  }

  /**
   * Turns risk string into RiskLevel enum.
   */
  private getRisk(riskStrig: string): RiskLevel {
    if (riskStrig != "low" && riskStrig != "medium" && riskStrig != "high") {
      throw Error(`Value for risk is inavlid`);
    }
    let riskEnum = RiskLevel.low;
    if (riskStrig == "medium") {
      riskEnum = RiskLevel.medium;
    } else if (riskStrig == "high") {
      riskEnum = RiskLevel.high;
    }
    return riskEnum;
  }
}
