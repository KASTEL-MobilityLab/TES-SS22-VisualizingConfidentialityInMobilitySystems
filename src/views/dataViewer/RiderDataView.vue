<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";

const user = {
  id: "U01",
  forename: "Theo",
  surname: "Schweitzer",
  phoneNumber: "02256708826",
  email: "theo.schweitzer@gmail.com",
};
const riskColor = {
  id: "text-success",
  forename: "text-warning",
  surname: "text-warning",
  phoneNumber: "text-warning",
  email: "text-warning",
};
const $dm = inject(dataManagerKey) as DataManager;
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <div>{{ $dm.companies }}</div>
  <template v-for="(data, fieldName) in user" :key="fieldName">
    <div :class="riskColor[fieldName]">
      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          {{ fieldName.toUpperCase() }}
        </div>
        <div class="col m-2">
          {{ data }}
        </div>
      </div>
    </div></template
  >
</template>
