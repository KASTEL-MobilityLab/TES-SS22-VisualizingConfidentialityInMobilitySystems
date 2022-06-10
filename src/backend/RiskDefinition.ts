import { riskExplanation } from "./RiskExplanation.js";

/**
 *
 */
export class RiskDefinition {
  dataType: string;
  detailedStringId: number;

  constructor(dataType: string, detailedStringId: number) {
    this.dataType = dataType;
    this.detailedStringId = detailedStringId;
  }
}
