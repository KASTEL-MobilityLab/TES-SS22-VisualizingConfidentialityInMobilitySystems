<script setup lang="ts">
import { DataModule } from "@/backend/dataModules/DataModule";
import { RiskManager } from "@/backend/RiskManager";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";

const $dm = inject(dataManagerKey);
const riskManager = new RiskManager();
var dmUsers = $dm?.users;
var dmDataModule = new DataModule(dmUsers![0], $dm?.riskManager);
const testString = "TODO";
const currentRole = $dm?.currentRole;
console.log(dmDataModule.risks);
</script>

<template>
  <div v-for="(value, key) in dmDataModule.displayedData" :key="key">
    <!-- Call method that opens the overlay of the explanation after click-->
    <button @click="riskManager.getExplanation(testString, currentRole)">
      {{ key }}
    </button>
    : {{ value }}
  </div>
</template>
