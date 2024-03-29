import {
  IS_NOT_VISIBLE_KEY,
  IS_VISIBLE_KEY,
  type Explanation,
  type RetentionPeriod,
  type VisibilityExplanation,
} from "@/backend/riskManager/types";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Exclude, Expose } from "class-transformer";

/**
 * The RiskExplanation Class that contains the explanations for each risk of a data type (e.g. User Forename)
 */
export class RiskExplanation {
  @Expose()
  readonly retentionPeriod: RetentionPeriod;

  @Exclude()
  private visibilityExplanation: VisibilityExplanation;

  @Expose()
  private readonly visibilitySource?: string;

  @Expose()
  readonly riskLevelExplanation: Explanation;

  /**
   * Constructs a new RiskExplanation for a data type.
   *
   * @param retentionPeriod the number of days that the data is stored or a translation key
   * @param riskLevelExplanation explains the risk level of this data
   * @param visibilitySource the source for the visibility explanation of this data
   */
  constructor(
    retentionPeriod: RetentionPeriod,
    riskLevelExplanation: Explanation,
    visibilitySource?: string
  ) {
    this.retentionPeriod = retentionPeriod;
    this.riskLevelExplanation = riskLevelExplanation;
    this.visibilitySource = visibilitySource;
    this.visibilityExplanation = {
      isVisibleKey: IS_VISIBLE_KEY,
      isNotVisibleKey: IS_NOT_VISIBLE_KEY,
    };
  }

  /**
   * Returns the explanation for the given visibility.
   *
   * @param isVisible if true, the corresponding explanation is returned
   * @returns the explanation for the given visibility
   */
  getVisibilityExplanation(isVisible: boolean): Explanation {
    const explanation: Explanation = {
      translationKey: "",
    };
    if (this.visibilitySource) {
      explanation.source = this.visibilitySource;
    }
    if (isVisible) {
      explanation.translationKey = this.visibilityExplanation.isVisibleKey;
    } else {
      explanation.translationKey = this.visibilityExplanation.isNotVisibleKey;
    }
    return explanation;
  }
}
