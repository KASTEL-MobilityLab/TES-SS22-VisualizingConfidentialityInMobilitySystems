<template>
  <div id="leafletMap"></div>
</template>

<script lang="ts">
import L from "leaflet";
import { onMounted } from "vue";
export default {
  setup() {
    let map;
    onMounted(() => {
      map = new L.Map("leafletMap").setView([49.006889, 8.403653], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);
    });
  },
};
</script>
<style scoped>
#leafletMap {
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: absolute;
}
</style>