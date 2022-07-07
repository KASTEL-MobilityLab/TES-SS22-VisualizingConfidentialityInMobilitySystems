<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { computed, type ComputedRef } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const VEHICLE_DATA_VIEW_KEY = "app.dataViews.vehicleDataView";

const currentVehicle: ComputedRef<DataModule | undefined> = computed(() => {
  const vehicle = $dm.value.currentData.getVehicle();
  if (vehicle) {
    return new DataModule(vehicle, $dm.value.riskManager);
  }
});
</script>

<template>
  <DataModuleVue
    :data-module="currentVehicle"
    :data-field-name="VEHICLE_DATA_VIEW_KEY"
  />
</template>
