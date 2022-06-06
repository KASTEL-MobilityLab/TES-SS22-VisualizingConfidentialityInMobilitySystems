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
      L.tileLayer(
        "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 14,
          maxZoom: 17,
        }
      ).addTo(map);
      L.tileLayer(
        "https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.png",
        {
          attribution:
            'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 14,
          maxZoom: 17,
        }
      ).addTo(map);
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
