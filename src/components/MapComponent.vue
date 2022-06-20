<script setup lang="ts">
import {
  createBikeMarker,
  createBusMarker,
  createTrainMarker,
} from "@/utils/markerUtils";
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
const bikePositionV01 = new L.LatLng(49.007478, 8.385981);
const trainPositionV02 = new L.LatLng(49.0075, 8.381111);
const busPositionV03 = new L.LatLng(49.0025, 8.38591);

onMounted(() => {
  const map = L.map("leafletMap", {
    center: bounds.getCenter(),
    zoom: 15,
    layers: [stamenWaterColor, mapLabels],
    maxBounds: bounds,
    maxBoundsViscosity: 0.6,
  });
  // add some test markers
  createBikeMarker(bikePositionV01).addTo(map);
  createBusMarker(busPositionV03).addTo(map);
  createTrainMarker(trainPositionV02).addTo(map);
});
</script>

<template>
  <div id="leafletMap"></div>
</template>

<style scoped>
#leafletMap {
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: absolute;
}
#fontAwesomeIcon {
  text-align: center;
  line-height: 20px;
}
</style>
