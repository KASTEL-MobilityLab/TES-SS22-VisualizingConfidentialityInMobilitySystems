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
    if (!this.isNotVisibleExplanation) {
      // construct the objects manually and then set the keys afterwards
      this.isNotVisibleExplanation = {
        Company: { translationKey: "" },
        User: { translationKey: "" },
        City: { translationKey: "" },
      };
      this.isVisibleExplanation = {
        Company: { translationKey: "" },
        User: { translationKey: "" },
        City: { translationKey: "" },
      };
      this.setRoleExplanationTranslationKeys("isNotVisible", false);
      this.setRoleExplanationTranslationKeys("isVisible", true);
    }
  }

  /**
   * Returns the explanation for the given role and the given visibility.
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

  // sets the translation key for each role, so that we do not have to do it manually in the json file
  private setRoleExplanationTranslationKeys(
    prefix: string,
    isVisible: boolean
  ) {
    let explanations: RoleExplanation;
    if (isVisible) {
      explanations = this.isVisibleExplanation;
    } else {
      explanations = this.isNotVisibleExplanation;
    }
    for (const key in explanations) {
      explanations[key].translationKey = prefix + "_" + key.toLowerCase();
    }
  }
}
