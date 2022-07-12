import type { InjectionKey, Ref } from "vue";
import type { DataManager } from "./backend/DataManager";

export const dataManagerKey = (<unknown>Symbol("$dataManager")) as InjectionKey<
  Ref<DataManager>
>;
