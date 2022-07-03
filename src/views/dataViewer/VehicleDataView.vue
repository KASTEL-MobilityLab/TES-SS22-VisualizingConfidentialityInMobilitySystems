<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const VEHICLE_DATA_VIEW_DECLARATION = "Vehicle Data View";
var vehicles = $dm.value.vehicles;
var dataModule = new DataModule(vehicles[0], $dm.value.riskManager);
</script>

<template>
  <DataModuleVue
    :data-module="dataModule"
    :data-field-name="VEHICLE_DATA_VIEW_DECLARATION"
  />
</template>
