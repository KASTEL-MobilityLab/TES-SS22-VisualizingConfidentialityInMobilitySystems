<script setup lang="ts">
import type { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import MapComponent from "@/components/MapComponent.vue";
import RiskBar from "@/components/RiskBar.vue";
import { DATA_MANAGER_KEY, MARKER_MANAGER_KEY } from "@/keys";
import { inject, type Ref } from "vue";
import { RouterView } from "vue-router";

const $dm = inject(DATA_MANAGER_KEY) as Ref<DataManager>;
const $mm = inject(MARKER_MANAGER_KEY) as Ref<MarkerManager>;
await $dm.value.init();
$mm.value.init($dm.value.vehicles);
</script>

<template>
  <MapComponent />
  <!-- d-flex is needed for the top-buffer in the container to work 
  offset puts the column to the right, but only large screens. Mid screens and smaller only have one column
  overflow-auto makes the container scrollable -->
  <div class="d-flex p-4 col-lg-4 offset-lg-7 overflow-auto">
    <div class="col position-absolute bottom-0 start-0 overlay">
      <RiskBar />
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.overlay {
  z-index: 2;
}
</style>
