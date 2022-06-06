<template>
  <div id="leafletMap"></div>
</template>

<script lang="ts">
import L from "leaflet";
import { onMounted } from "vue";

const topLeft = new L.LatLng(49.036357, 8.334785);
const bottomRight = new L.LatLng(48.977558, 8.469264);
const bounds = new L.LatLngBounds(topLeft, bottomRight);

const stamenWaterColor = L.tileLayer(
  "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
  {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 14,
    maxZoom: 16,
  }
);

const mapLabels = L.tileLayer(
  "https://stamen-tiles.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}.png",
  {
    minZoom: 14,
    maxZoom: 16,
  }
);

export default {
  setup() {
    let map;
    onMounted(() => {
      map = new L.Map("leafletMap", {
        center: bounds.getCenter(),
        zoom: 15,
        maxBounds: bounds,
        maxBoundsViscosity: 0.6,
      });
      // add tileLayers
      stamenWaterColor.addTo(map);
      mapLabels.addTo(map);
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
