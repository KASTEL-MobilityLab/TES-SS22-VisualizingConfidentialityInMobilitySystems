import { Expose, Transform, Type } from "class-transformer";
import { DataType } from "../DataType";
import { Role } from "../Role";
import { RiskExplanation } from "./RiskExplanation";
import { RiskLevel } from "./RiskLevel";

/**
 * The Risk class contains the DataType (e.g. Forename), the associated Risk Level (low, medium, high)
 * the visibility of the data for each and role and a respective explanation why it is or is not visible in the specified Role.
 */
export class Risk {
  @Transform(({ value }) => DataType[value as keyof typeof DataType])
  @Expose()
  dataType: DataType;

  // convert string to real RiskLevel
  // use the key of the RiskLevel enum (not the assigned string value)
  @Transform(({ value }) => RiskLevel[value as keyof typeof RiskLevel])
  @Expose()
  riskLevel: RiskLevel;

  @Type(() => String)
  @Transform(({ value }) =>
    value.map((roleString: string) => Role[roleString as keyof typeof Role])
  )
  @Expose()
  roleVisibility: Role[];

  @Expose()
  @Type(() => RiskExplanation)
  explanation: RiskExplanation;

  constructor(
    dataType: DataType,
    riskLevel: RiskLevel,
    roleVisibility: Role[],
    explanation: RiskExplanation
  ) {
    this.dataType = dataType;
    this.riskLevel = riskLevel;
    this.roleVisibility = roleVisibility;
    this.explanation = explanation;
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

  /**
   * Returns the correct explanation for the given role. The result depends on the visibility of this datatype in the given role.
   *
   * @param role the role to get the explanation for.
   * @returns the Explanation for the role
   */
  getExplanation(role: Role) {
    return this.explanation.getVisibilityExplanation(this.isVisible(role));
  }
}
