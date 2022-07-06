import { Expose } from "class-transformer";
import type { Explanation, RetentionPeriod, RoleExplanation } from ".";
import type { Role } from "../Role";

/**
 *  The RiskExplanation Class that contains the explanations for each risk of a data type (e.g. User Forename)
 */
export class RiskExplanation {
  @Expose()
  readonly retentionPeriod: RetentionPeriod;

  /**
   * Depending on which role is currently selected, this variable stores the explanation, why it is or is not visible.
   */
  @Expose()
  readonly isNotVisibleExplanation: RoleExplanation;

  @Expose()
  readonly isVisibleExplanation: RoleExplanation;

  @Expose()
  readonly riskLevelExplanation: Explanation;

  /**
   * Constructs a new RiskExplanation for a data type.
   *
   * @param retentionPeriod the number of days that the data is stored or a translation key
   * @param isNotVisibleExplanation explains for each role why this data is not visible
   * @param isVisibleExplanation explains for each role why this data is visible
   * @param riskLevelExplanation explains the risk level of this data
   */
  constructor(
    retentionPeriod: RetentionPeriod,
    isNotVisibleExplanation: RoleExplanation,
    isVisibleExplanation: RoleExplanation,
    riskLevelExplanation: Explanation
  ) {
    this.retentionPeriod = retentionPeriod;
    this.isNotVisibleExplanation = isNotVisibleExplanation;
    this.isVisibleExplanation = isVisibleExplanation;
    this.riskLevelExplanation = riskLevelExplanation;
    // this.setRoleExplanationTranslationKeys(
    //   "isNotVisible",
    //   false,
    //   isNotVisibleExplanation
    // );
    // this.setRoleExplanationTranslationKeys(
    //   "isVisible",
    //   true,
    //   isVisibleExplanation
    // );
    if (!this.retentionPeriod) {
      // set default values as a temporary workaround
      this.retentionPeriod = 365;
      this.isNotVisibleExplanation = {
        Company: { translationKey: "NOT_SET" },
        User: { translationKey: "NOT_SET" },
        City: { translationKey: "NOT_SET" },
      };
      this.isVisibleExplanation = {
        Company: { translationKey: "NOT_SET" },
        User: { translationKey: "NOT_SET" },
        City: { translationKey: "NOT_SET" },
      };
      this.riskLevelExplanation = {
        translationKey: "NOT_SET",
      };
    }
  }

  /**
   *
   * @param isVisible if true, the corresponding explanation is returned
   * @returns
   */
  getRoleExplanation(isVisible: boolean, role: Role): Explanation {
    let roleExplanation: RoleExplanation | undefined;
    if (isVisible) {
      roleExplanation = this.isVisibleExplanation;
    } else {
      roleExplanation = this.isNotVisibleExplanation;
    }
    if (roleExplanation) {
      return roleExplanation[role];
    } else {
      return { translationKey: "" };
      // throw new Error(
      //   `Explanation for role ${role} and visibility ${isVisible} not found`
      // );
    }
  }

  private setRoleExplanationTranslationKeys(
    prefix: string,
    isVisible: boolean,
    explanations: RoleExplanation
  ) {
    for (const key in explanations) {
      explanations[key].translationKey = prefix + "_" + key;
    }
  }
}
