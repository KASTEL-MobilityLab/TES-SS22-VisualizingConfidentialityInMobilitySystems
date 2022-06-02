<script lang="ts">
import { DataManager } from "@/backend/DataManager";
import { onMounted, ref } from "vue";
export default {
  setup() {
    let dm = new DataManager();
    const allDataModules = ref([
      { id: 1, value: "Rider Data" },
      { id: 2, value: "Vehicle Data" },
      { id: 3, value: "Payment Data" },
      { id: 4, value: "Trip Data" },
    ]);
    onMounted(() => {
      dm.loadAllData();
    });
    return {
      dm,
      allDataModules,
    };
  },
};
</script>

<template>
  <div class="container w-75 bg-light rounded">
    <h1 class="text-center p-2">Data Viewer</h1>
    <template v-for="data in allDataModules" :key="data.id">
      <div class="row">
        <div class="col text-center m-5">{{ data.value }}</div>
      </div>
    </template>
  </div>
</template>
