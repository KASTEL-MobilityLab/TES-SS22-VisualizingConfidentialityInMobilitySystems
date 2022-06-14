<script lang="ts">
import { dataManagerKey } from "@/keys";
import { inject, ref } from "vue";
export default {
  setup() {
    const $dm = inject(dataManagerKey);
    const allDataModules = ref([
      { id: 1, value: "Rider Data" },
      { id: 2, value: "Vehicle Data" },
      { id: 3, value: "Payment Data" },
      { id: 4, value: "Trip Data" },
    ]);
    return {
      allDataModules,
    };
  },
};

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
</script>

<template>
  <div class="container w-75 h-75 bg-light rounded">
    <h1 class="text-center p-2">Data Viewer</h1>
    <template v-for="data in allDataModules" :key="data.id">
      <div class="row">
        <div class="col text-center m-5">{{ data.value }}</div>
      </div>
    </template>
  </div>
</template>
