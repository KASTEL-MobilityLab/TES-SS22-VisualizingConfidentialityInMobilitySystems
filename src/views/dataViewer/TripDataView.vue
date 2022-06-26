<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";

const $dm = inject(dataManagerKey) as DataManager;
var dmUsers = $dm?.users;
var dmDataModule = new DataModule(dmUsers![0], $dm.riskManager);
</script>

<template>
  <div v-for="(value, key) in dmDataModule.displayedData" :key="key">
    <!-- Call method that opens the overlay of the explanation after click-->
    <button>
      {{ $t(key) }}
    </button>
    : {{ value }}
  </div>
</template>
