import type { DataType } from "@/backend/DataType";

export const DELIMITER = ".";
export const APP_PREFIX = "app";
export const DATA_TYPE_PREFIX = "data";
export const EXPLANATION_PREFIX = "explanation";
export type DataTypeKey =
  `${typeof DATA_TYPE_PREFIX}${typeof DELIMITER}${DataType}`;

/**
 * Concatenates the given (sub-)keys with the delimiter and prefixes the translation key with the given prefix.
 *
 * @param prefix the prefix of the key, e.g. app
 * @param keys the sub-keys to concatenate
 * @returns the translation key
 */
export function concatenatePrefixWithKeys(
  prefix: string,
  ...keys: string[]
): string {
  return prefix + "." + keys.join(DELIMITER);
}

/**
 * Returns the translation key for the given data type(s).
 *
 * @param keys the DataType keys to concatenate
 * @returns the translation key for the datatype(s).
 */
export function getTranslationKeyForDataType(...keys: DataType[]): string {
  if (!keys[0]) {
    // workaround for now, as this case will not be displayed in the UI currently
    return "";
  }
  return concatenatePrefixWithKeys(DATA_TYPE_PREFIX, ...keys);
}

/**
 * Returns the translation key for the given explanation.
 *
 * @param keys the explanation keys to concatenate
 * @returns the translation key for the explanation(s).
 */
export function getTranslationKeyForExplanation(...keys: string[]): string {
  if (!keys[0]) {
    return "";
  }
  return concatenatePrefixWithKeys(EXPLANATION_PREFIX, ...keys);
}
