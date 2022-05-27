<template>
  <main>
    <div id="leafletMap"></div>
  </main>
</template>

<script lang="ts">
import * as L from "leaflet";
import { onMounted } from "vue";
export default {
  setup() {
    let map;
    onMounted(() => {
      map = new L.Map("leafletMap").setView([49.006889, 8.403653], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
      }).addTo(map);
    });
  },
};
</script>
<style scoped>
#leafletMap {
  height: 1000px;
}
</style>
