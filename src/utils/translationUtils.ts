import type { DataType } from "@/backend/DataType";

export const Delimiter = ".";
export const AppPrefix = "app";
export const DataTypePrefix = "data";
export const ExplanationPrefix = "explanation";

function concatenatePrefixWithKey(prefix: string, key: string): string {
  return `${prefix}${Delimiter}${key}`;
}

export function getTranslationKeyForDataType(
  key: DataType | undefined
): string {
  if (!key) {
    // workaround for now, as this case will not be displayed in the UI currently
    return "";
  }
  return concatenatePrefixWithKey(DataTypePrefix, key);
}

export function getTranslationKeyForExplanation(
  key: string | undefined
): string {
  if (!key) {
    return "";
  }
  return concatenatePrefixWithKey(ExplanationPrefix, key);
}
