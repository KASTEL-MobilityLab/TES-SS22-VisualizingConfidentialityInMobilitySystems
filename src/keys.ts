import type { InjectionKey, Ref } from "vue";
import type { MarkerManager } from "./animation/MarkerManager";
import type { DataManager } from "./backend/DataManager";

export const dataManagerKey = Symbol("$dataManager") as InjectionKey<
  Ref<DataManager>
>;

export const markerManagerKey = Symbol("$markerManager") as InjectionKey<
  Ref<MarkerManager>
>;
