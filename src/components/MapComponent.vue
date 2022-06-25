<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { generateAllVehicleMarkers } from "@/utils/markerUtils";
import L, { type LeafletEvent } from "leaflet";
import { inject, onMounted } from "vue";

const $dm = inject(dataManagerKey) as DataManager;

// setup the map and generate markers, when this component is mounted
onMounted(() => {
  const map = setupMap();
  setupMarkers(map);
});

/**
 * Setup the map with layers and bounds.
 */
function setupMap(): L.Map {
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
  return L.map("leafletMap", {
    center: bounds.getCenter(),
    zoom: 15,
    layers: [stamenWaterColor, mapLabels],
    maxBounds: bounds,
    maxBoundsViscosity: 0.6,
  });
}

/**
 * Generate the markers for the map by accessing the vehicles property of the global data manager.
 * */
function setupMarkers(map: L.Map) {
  var markersLayer = L.featureGroup().addTo(map);
  // add this event listener to each marker in the feature group
  markersLayer.on("click", vehicleMarkerClicked);

  const vehicles = $dm.vehicles;
  const markers = generateAllVehicleMarkers(vehicles);
  markers.forEach((marker) => {
    marker.addTo(markersLayer);
  });
}

/**
 * Sets the currently selected vehicle in the data manager to the clicked vehicle.
 *
 * @param event the layer event of the clicked marker
 */
function vehicleMarkerClicked(event: LeafletEvent) {
  const marker = event.propagatedFrom as VehicleMarker;
  const vehicle = marker.vehicle;
  console.log(
    "Clicked on marker of vehicle " +
      vehicle.id +
      " at position " +
      marker.getLatLng()
  );
  $dm.currentVehicle = vehicle;
}
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
