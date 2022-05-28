<script setup lang="ts">
// import DataField from "@/backend/datafield/DataField.ts";

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.

defineProps<{
  dataField: string; // replace with real DataField when PR is merged
}>();
</script>

<template>
  <span>
    {{ dataField }}
  </span>
</template>
