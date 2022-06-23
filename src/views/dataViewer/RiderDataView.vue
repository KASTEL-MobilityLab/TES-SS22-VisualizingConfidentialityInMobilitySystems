<script setup lang="ts">
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
const $dm = inject(dataManagerKey);
var users = $dm?.users;
var dataModule = new DataModule(users![0], $dm?.riskManager);
const riskColor = {
  id: "text-success",
  forename: "text-warning",
  surname: "text-warning",
  phoneNumber: "text-warning",
  email: "text-warning",
};
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <template v-for="(value, key) in dataModule.displayedData" :key="key">
    <div class="risks[key]">
      <!-- div class="riskColor[key]"> -->
      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <button>
            {{ $t(key) }}
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
