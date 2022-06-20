import type { InjectionKey } from "vue";
import type { DataManager } from "./backend/DataManager";

export const dataManagerKey = Symbol(
  "$dataManager"
) as InjectionKey<DataManager>;
