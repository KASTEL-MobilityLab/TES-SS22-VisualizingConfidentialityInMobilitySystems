import { RiskExplanation } from "@/backend/riskManager/RiskExplanation";

/**
 * Manually defines the expected explaanations.
 */
export const explanations: RiskExplanation[] = [
  new RiskExplanation("stored_until_no_longer_necessary", {
    translationKey: "low_risk_explanation",
  }),
  new RiskExplanation("stored_until_no_longer_necessary", {
    translationKey: "low_risk_explanation",
  }),
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "medium_risk_explanation" },
    "https://dsgvo-gesetz.de/art-12-dsgvo/"
  ),
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "medium_risk_explanation" },
    "https://dsgvo-gesetz.de/art-12-dsgvo/"
  ),
];
