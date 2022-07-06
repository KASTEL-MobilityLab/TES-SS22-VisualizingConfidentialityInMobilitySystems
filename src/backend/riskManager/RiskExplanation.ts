import { Expose } from "class-transformer";
import type { Role } from "../Role";

/**
 * A RoleExplanation is a Record with the Role as key and an explanation
 */
export type RoleExplanation = Record<Role, Explanation>;

/**
 * An Explanation has an translation key and optionally a source string (e.g. another website)
 */
export type Explanation = {
  translationKey: string;
  source?: string;
};

/**
 * A RetentionPeriod can be either a string (translation key) or a number (retention period in number of days)
 */
export type RetentionPeriod = string | number;

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
  readonly isNotVisibleExplanation?: RoleExplanation;

  @Expose()
  readonly isVisibleExplanation?: RoleExplanation;

  /**
   *
   * @param retentionPeriod the number of days that the data is stored or a translation key
   * @param isNotVisibleExplanation explains for each role why this data is not visible
   * @param isVisibleExplanation explains for each role why this data is visible
   */
  constructor(
    retentionPeriod?: RetentionPeriod,
    isNotVisibleExplanation?: RoleExplanation,
    isVisibleExplanation?: RoleExplanation
  ) {
    this.retentionPeriod = retentionPeriod;
    this.isNotVisibleExplanation = isNotVisibleExplanation;
    this.isVisibleExplanation = isVisibleExplanation;
  }

  /**
   *
   * @param isVisible if true, the corresponding explanation is returned
   * @returns
   */
  getExplanation(isVisible: boolean, role: Role): Explanation {
    let roleExplanation: RoleExplanation | undefined;
    if (isVisible) {
      roleExplanation = this.isVisibleExplanation;
    } else {
      roleExplanation = this.isNotVisibleExplanation;
    }
    if (roleExplanation) {
      return roleExplanation[role];
    } else {
      throw new Error(
        `Explanation for role ${role} and visibility ${isVisible} not found`
      );
    }
  }
}
