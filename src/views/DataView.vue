<script setup lang="ts">
import { inject } from "vue";
import { RouterView } from "vue-router";
const dataViewerVisible = inject("dataViewerVisible");
</script>

<template>
  <!-- By using position-relative and overlay, we only overlay this container on top of the map, the 
  rest of the row is below it. Now we can still click on the map in this row -->
  <div
    v-show="dataViewerVisible"
    id="data-viewer"
    class="container bg-light rounded top-buffer overflow-auto"
  >
    <h1 class="text-center p-3 fw-bold">
      <i class="fa-solid fa-database fa-fw"></i> {{ $t("app.dataViewer") }}
    </h1>
    <div class="text-center m-2">
      <!-- All nested views will be displayed in this div. -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.top-buffer {
  margin-top: 20%;
}

#data-viewer {
  height: 75vh;
  z-index: 2;
  position: relative;
}
</style>
