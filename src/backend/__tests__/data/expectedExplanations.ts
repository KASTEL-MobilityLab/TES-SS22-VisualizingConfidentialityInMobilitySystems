import { RiskExplanation } from "@/backend/riskManager/RiskExplanation";

export const explanations: RiskExplanation[] = [
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "low_risk_explanation" },
    {
      Company: {
        translationKey: "isNotVisible_company",
      },
      User: {
        translationKey: "isNotVisible_user",
      },
      City: {
        translationKey: "isNotVisible_city",
      },
    },
    {
      Company: {
        translationKey: "isVisible_company",
      },
      User: {
        translationKey: "isVisible_user",
      },
      City: {
        translationKey: "isVisible_city",
      },
    }
  ),
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "low_risk_explanation" },
    {
      Company: {
        translationKey: "isNotVisible_company",
      },
      User: {
        translationKey: "isNotVisible_user",
      },
      City: {
        translationKey: "isNotVisible_city",
      },
    },
    {
      Company: {
        translationKey: "isVisible_company",
      },
      User: {
        translationKey: "isVisible_user",
      },
      City: {
        translationKey: "isVisible_city",
      },
    }
  ),
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "medium_risk_explanation" },
    {
      Company: {
        translationKey: "isNotVisible_company",
      },
      User: {
        translationKey: "isNotVisible_user",
      },
      City: {
        translationKey: "isNotVisible_city",
      },
    },
    {
      Company: {
        translationKey: "isVisible_company",
      },
      User: {
        translationKey: "isVisible_user",
      },
      City: {
        translationKey: "isVisible_city",
      },
    }
  ),
  new RiskExplanation(
    "stored_until_no_longer_necessary",
    { translationKey: "medium_risk_explanation" },
    {
      Company: {
        translationKey: "isNotVisible_company",
      },
      User: {
        translationKey: "isNotVisible_user",
      },
      City: {
        translationKey: "isNotVisible_city",
      },
    },
    {
      Company: {
        translationKey: "isVisible_company",
      },
      User: {
        translationKey: "isVisible_user",
      },
      City: {
        translationKey: "isVisible_city",
      },
    }
  ),
];
