<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const TRIP_DATA_VIEW_DECLARATION = "Trip Data View";
var trips = $dm.value.trips;
var dataModule = new DataModule(trips[0], $dm.value.riskManager);
</script>

<template>
  <DataModuleVue
    :data-module="dataModule"
    :data-field-name="TRIP_DATA_VIEW_DECLARATION"
  />
</template>
