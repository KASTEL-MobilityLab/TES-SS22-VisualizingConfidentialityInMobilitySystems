<script setup lang="ts">
import { AvailableData } from "@/backend/DataLoader";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";

const $dm = inject(dataManagerKey);
var dmUsers = $dm?.users;
var dmDataModule = new DataModule(dmUsers![0]);
</script>

<template>
  <div v-for="(value, key) in dmDataModule.displayedData" :key="key">
    {{ key }}: {{ value }}
  </div>
</template>
