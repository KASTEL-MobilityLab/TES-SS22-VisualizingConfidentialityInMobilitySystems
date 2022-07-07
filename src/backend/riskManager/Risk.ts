import { Expose, Transform, Type } from "class-transformer";
import { DataType } from "../DataType";
import { Role } from "../Role";
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

  constructor(
    dataType: DataType,
    riskLevel: RiskLevel,
    roleVisibility: Role[]
  ) {
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
    console.log(this.roleVisibility.includes(role));
    return this.roleVisibility.includes(role);
  }
}
