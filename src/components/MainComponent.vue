<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import MapComponent from "@/components/MapComponent.vue";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
import { RouterView } from "vue-router";

const $dm = inject(dataManagerKey) as DataManager;
await $dm.init();
</script>
<template>
  <MapComponent />
  <div class="overlay">
    <!-- Renders the view that matches the top level root: DataViewerView and HelpView
        We need to find a way to show HelpView on the left side and not switch between Help and DataViewer-->
    <RouterView />
  </div>
</template>

<style scoped>
div.overlay {
  /* This stretches these elements to the edges of
    the closest element upwards in the DOM with a relative
    positioning (in this case it's the .outer-wrap) */
  position: absolute;
  top: 15vh;
  right: 0;
  bottom: 0;
  left: 65vw;
  z-index: 2;
  opacity: 0.95;
  border-radius: 150px;
}
</style>
