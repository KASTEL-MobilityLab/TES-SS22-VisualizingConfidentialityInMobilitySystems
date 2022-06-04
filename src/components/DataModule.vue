<script setup lang="ts">
import type { DataField } from "@/backend/dataFields/DataField";
import type { Vehicle } from "@/backend/dataFields/Vehicle";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
defineProps<{
  dataField: DataField;
}>();

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.

const $dm: DataManager | undefined = inject(dataManagerKey);
if ($dm == undefined) {
  throw Error("could not inject data Manager");
}
// instead of V01 we will later have access to the currently selected vehicle on the map
// via an app-level provided attribute.
const vehicle: Vehicle = $dm.getDataById("V01");
</script>

<template>
  <div class="container-fluid text-dark">
    <h3 class="text-center p-2">{{ dataField.id }}</h3>
    <div class="text-center m-5">{{ vehicle.id }}</div>
  </div>
</template>
