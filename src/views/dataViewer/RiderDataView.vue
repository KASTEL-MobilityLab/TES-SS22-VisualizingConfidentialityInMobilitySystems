<script setup lang="ts">
import { DataLoader } from "@/backend/DataLoader";
import { DataModule } from "@/backend/dataModules/DataModule";
import { RiskManager } from "@/backend/RiskManager";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
const dataLoader = new DataLoader({});
const $dm = inject(dataManagerKey);
var dmUsers = $dm?.users;
var dmDataModule = new DataModule(dmUsers![0], $dm?.riskManager);
const riskManager = new RiskManager();
const risks = dmDataModule.risks;
console.log(risks);
const riskColor = {
  id: "text-success",
  forename: "text-warning",
  surname: "text-warning",
  phoneNumber: "text-warning",
  email: "text-warning",
};
const testString = "TODO";
const currentRole = $dm?.currentRole;
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <template v-for="(value, key) in dmDataModule.displayedData" :key="key">
    <div class="risks[key]">
      <!-- div class="riskColor[key]"> -->
      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <button @click="riskManager.getExplanation(testString, currentRole)">
            {{ key }}
          </button>
        </div>
        <div class="col m-2">
          {{ value }}
        </div>
      </div>
    </div>
    <!-- </div> -->
  </template>
</template>
