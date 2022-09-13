import { RiskLevel } from "./RiskLevel";

/**
 * Enum that stores all  possible colors of risks (green, yellow, and green). Assignes these colors to the
 * particular Bootstrap keys for colors.
 */
export enum RiskColor {
  Green = "success",
  Yellow = "warning",
  Red = "danger",
}

/**
 * Getter for the risk color of a given risk level.
 * @param riskLevel the risk level to which the risk color is searched for.
 * @returns the risk color for the given risk level.
 */
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
