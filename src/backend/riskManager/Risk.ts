import { Expose, Transform, Type } from "class-transformer";
import type { Company, User } from "../dataFields";
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
   * Returns true, if this datatype is visible in the given role and current data.
   *
   * @param role the Role to check for visibility
   * @param roleUser the possible selected user role
   * @param currentDataUser the possible current selected user
   * @param roleCompany the possible selected company role
   * @param currentDataCompany the possible current selected comapny
   * @returns true if this datatype is visible in the given role, false otherwise
   */
  isVisible(
    role: Role,
    roleUser?: User,
    currentDataUser?: User,
    roleCompany?: Company,
    currentDataCompany?: Company
  ): boolean {
    if (roleUser && currentDataUser) {
      if (roleUser === currentDataUser) {
        return this.roleVisibility.includes(role);
      }
    } else if (roleCompany && currentDataCompany) {
      if (roleCompany === currentDataCompany) {
        return this.roleVisibility.includes(role);
      }
    } else if (role === Role.City) {
      return this.roleVisibility.includes(role);
    }
    return false;
  }
}
