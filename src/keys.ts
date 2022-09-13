import type { InjectionKey, Ref } from "vue";
import type { MarkerManager } from "./animation/MarkerManager";
import type { DataManager } from "./backend/DataManager";

export const DATA_MANAGER_KEY = Symbol("$dataManager") as InjectionKey<
  Ref<DataManager>
>;

export const MARKER_MANAGER_KEY = Symbol("$markerManager") as InjectionKey<
  Ref<MarkerManager>
>;
