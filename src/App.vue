<script setup lang="ts">
import MapComponent from "@/components/MapComponent.vue";
import NavBar from "@/components/NavBar.vue";
import DataViewer from "./components/DataViewer.vue";
</script>

<template>
  <main>
    <NavBar />
    <div class="outer-wrap">
      <MapComponent />
      <div class="overlay">
        <DataViewer />
      </div>
    </div>
  </main>
</template>
<style scoped>
.outer-wrap {
  /* Must have some sort of height and width so that
    inner children (map and overlay) can position
    themselves to it */
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;
}

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
  opacity: 0.9;
  border-radius: 150px;
}
</style>
