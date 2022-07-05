<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
var dmUsers = $dm.value.users;
var dmDataModule = new DataModule(dmUsers[0], $dm.value.riskManager);
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
