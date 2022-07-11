/**
 * Enum that stores all  possible colors of risks (green, yellow, and green). Assignes these colors to the
 * particular Bootstrap keys for colors.
 */

import { RiskLevel } from "./RiskLevel";

export enum RiskColor {
  Green = "success",
  Yellow = "warning",
  Red = "danger",
}

export function getRiskColor(riskLevel: RiskLevel): RiskColor {
  switch (riskLevel) {
    case RiskLevel.Low:
      return RiskColor.Green;
    case RiskLevel.Medium:
      return RiskColor.Yellow;
    case RiskLevel.High:
      return RiskColor.Red;
    default:
      throw new Error("Unknown risk level");
  }
}
