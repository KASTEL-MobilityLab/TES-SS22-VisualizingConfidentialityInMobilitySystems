import { Expose, Transform, Type } from "class-transformer";
import { DataType } from "../DataType";
import { Role } from "../Role";
import { RiskExplanation } from "./RiskExplanation";
import { RiskLevel } from "./RiskLevel";

/**
 * The riskDefinition class.
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
  explanation?: RiskExplanation;

  constructor(
    dataType: DataType,
    riskLevel: RiskLevel,
    roleVisibility: Role[],
    explanation?: RiskExplanation
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
}
