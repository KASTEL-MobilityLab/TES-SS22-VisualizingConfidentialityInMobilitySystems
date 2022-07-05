<script setup lang="ts">
import type { DataField } from "@/backend/dataFields/DataField";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
defineProps<{
  dataField: DataField;
}>();

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.

const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <div class="container-fluid text-dark">
    <h3 class="text-center p-2">{{ dataField.id }}</h3>
  </div>
</template>
