<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const TRIP_DATA_VIEW_KEY = "app.dataViews.tripDataView";
var dataModule = new DataModule(
  $dm.value.currentData.getTrip()!,
  $dm.value.riskManager
);
</script>

<template>
  <DataModuleVue
    :data-module="dataModule"
    :data-field-name="TRIP_DATA_VIEW_KEY"
  />
</template>
