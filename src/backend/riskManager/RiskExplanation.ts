import { Expose } from "class-transformer";
import type { Role } from "../Role";

type RoleExplanation = Record<Role, string>;
type RetentionPeriod = string | number;

/**
 *  The RiskExplanation Class that contains the explanations for each risk of a data type (e.g. User Forename)
 */
export class RiskExplanation {
  @Expose()
  readonly retentionPeriod?: RetentionPeriod;

  /**
   * Depending on which role is currently selected, this variable stores the explanation, why it is or is not visible.
   */
  @Expose()
  readonly roleVisibilityExplanation?: RoleExplanation;

  /**
   *
   * @param retentionPeriod the number of days that the data is stored or a translation key
   * @param roleVisibilityExplanation the explanation for the visibility of each role for this data type
   */
  constructor(
    retentionPeriod?: RetentionPeriod,
    roleVisibilityExplanation?: RoleExplanation
  ) {
    this.retentionPeriod = retentionPeriod;
    this.roleVisibilityExplanation = roleVisibilityExplanation;
  }
}
