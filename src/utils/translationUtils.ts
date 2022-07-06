import type { DataType } from "@/backend/DataType";

export const Delimiter = ".";
export const AppPrefix = "app";
export const DataTypePrefix = "data";
export const ExplanationPrefix = "explanation";

function concatenatePrefixWithKeys(prefix: string, ...keys: string[]): string {
  return prefix + "." + keys.join(Delimiter);
}

export function getTranslationKeyForDataType(...keys: DataType[]): string {
  if (!keys[0]) {
    // workaround for now, as this case will not be displayed in the UI currently
    return "";
  }
  return concatenatePrefixWithKeys(DataTypePrefix, ...keys);
}

export function getTranslationKeyForExplanation(...keys: string[]): string {
  if (!keys[0]) {
    return "";
  }
  return concatenatePrefixWithKeys(ExplanationPrefix, ...keys);
}
