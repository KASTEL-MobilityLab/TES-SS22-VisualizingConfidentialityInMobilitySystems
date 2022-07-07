<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { computed, type ComputedRef } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const TRIP_DATA_VIEW_KEY = "app.dataViews.tripDataView";

const currentTrip: ComputedRef<DataModule | undefined> = computed(() => {
  const trip = $dm.value.currentData.getTrip();
  if (trip) {
    return new DataModule(trip, $dm.value.riskManager);
  }
});
</script>

<template>
  <DataModuleVue
    :data-module="currentTrip"
    :data-field-name="TRIP_DATA_VIEW_KEY"
  />
</template>
