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
