export const IS_VISIBLE_KEY: "isVisible";
export const IS_NOT_VISIBLE_KEY: "isNotVisible";

/**
 * A RoleExplanation is a Record with the Role as key and an explanation
 */
export type VisibilityExplanation = {
  // defines the (translation) keys for each visibility.
  isVisibleKey: IS_VISIBLE_KEY;
  isNotVisibleKey: IS_NOT_VISIBLE_KEY;
};

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
