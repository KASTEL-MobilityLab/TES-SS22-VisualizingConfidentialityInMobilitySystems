import type { RiskLevel } from "./RiskLevel.js";

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
    risk: RiskLevel,
    userVisibility: boolean,
    companyVisibility: boolean,
    cityVisibility: boolean,
    visibleExplanation: string,
    notVisibleExplanation: string
  ) {
    this.dataType = dataType;
    this.risk = risk;
    this.userVisibility = userVisibility;
    this.companyVisibility = companyVisibility;
    this.cityVisibility = cityVisibility;
    this.visibleExplanation = visibleExplanation;
    this.notVisibleExplanation = notVisibleExplanation;
  }
}
