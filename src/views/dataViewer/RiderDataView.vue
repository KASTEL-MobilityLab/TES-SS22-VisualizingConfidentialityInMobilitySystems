<script setup lang="ts">
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
const $dm = inject(dataManagerKey);
var users = $dm?.users;
var dataModule = new DataModule(users![0], $dm?.riskManager);
console.log(dataModule.risks);
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <template v-for="(value, key) in dataModule.displayedData" :key="key">
    <div classs="my-buttons">
      <div class>
        <div class="row m-2 p-2">
          <div class="col m-2 fw-bold">
            <button type="button" :class="dataModule.risks[key]">
              {{ $t(key) }}
            </button>
          </div>
          <div class="col m-2">
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
