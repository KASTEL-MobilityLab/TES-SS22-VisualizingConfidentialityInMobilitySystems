import type { Role } from "../roles";
import type { RiskLevel } from "./RiskLevel";

/**
 * The riskDefinition class.
 */
export class RiskDefinition {
  dataType: string;
  riskLevel: RiskLevel;
  roleVisibility: Role[];

  constructor(dataType: string, riskLevel: RiskLevel, roleVisibility: Role[]) {
    this.dataType = dataType;
    this.riskLevel = riskLevel;
    this.roleVisibility = roleVisibility;
  }

  /**
   * Returns true, if this datatype is visible in the given role.
   *
   * @param role the Role to check for visibility
   * @returns true if this datatype is visible in the given role, false otherwise
   */
  isVisible(role: Role): boolean {
    return this.roleVisibility.includes(role);
  }
}
