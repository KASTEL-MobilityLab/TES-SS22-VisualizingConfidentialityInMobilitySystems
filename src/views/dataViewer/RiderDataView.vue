<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { DATA_MANAGER_KEY } from "@/keys";
import { computed, type ComputedRef } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(DATA_MANAGER_KEY) as Ref<DataManager>;

const RIDER_DATA_VIEW_KEY = "app.dataViews.riderDataView";

const currentRider: ComputedRef<DataModule | undefined> = computed(() => {
  const rider = $dm.value.currentData.getUser();
  if (rider) {
    return new DataModule(rider, $dm.value.riskManager);
  }
});
</script>

<template>
  <DataModuleVue
    :data-module="currentRider"
    :data-field-name="RIDER_DATA_VIEW_KEY"
  />
</template>
