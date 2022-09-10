import type { DataType } from "@/backend/DataType";

export const DELIMITER = ".";
export const APP_PREFIX = "app";
export const DATA_TYPE_PREFIX = "data";
export const EXPLANATION_PREFIX = "explanation";

function concatenatePrefixWithKeys(prefix: string, ...keys: string[]): string {
  return prefix + "." + keys.join(DELIMITER);
}

export function getTranslationKeyForDataType(...keys: DataType[]): string {
  if (!keys[0]) {
    // workaround for now, as this case will not be displayed in the UI currently
    return "";
  }
  return concatenatePrefixWithKeys(DATA_TYPE_PREFIX, ...keys);
}

export function getTranslationKeyForExplanation(...keys: string[]): string {
  if (!keys[0]) {
    return "";
  }
  return concatenatePrefixWithKeys(EXPLANATION_PREFIX, ...keys);
}
