<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { toLeafletLatLngArray } from "@/utils/latLngUtils";
import type { VehicleMarker } from "@/utils/leafletExtension";
import {
  generateAllVehicleMarkers,
  RouteEndIcon,
  RouteStartIcon,
} from "@/utils/markerUtils";
import { RoutingManager } from "@/utils/RoutingManager";
import L, { type LeafletEvent } from "leaflet";
import { inject, onMounted, watchEffect, type Ref } from "vue";
import { useRouter } from "vue-router";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
let routingManager: RoutingManager;
const router = useRouter();
let map: L.Map;
const LINE_STYLING = {
  color: "#363636",
  opacity: 1,
  weight: 6,
};

// create the instances with at a location. The locations will
// be updated when the user clicks on a vehicle.
const polyline = L.polyline([], LINE_STYLING);
const startMarker = L.marker(L.latLng(0, 0), { icon: RouteStartIcon });
const endMarker = L.marker(L.latLng(0, 0), {
  icon: RouteEndIcon,
});

// setup the map and generate markers, when this component is mounted
onMounted(() => {
  map = setupMap();
  const markersLayer = setupMarkers(map);
  map.on("click", emptySpotClicked);
  routingManager = new RoutingManager(map, $dm.value.trips);
});

/**
 * Hides the route.
 */
function hideRoute() {
  polyline.removeFrom(map);
  startMarker.removeFrom(map);
  endMarker.removeFrom(map);
}

/**
 * Shows the route.
 *
 * Note: Does not update the locations of the polyline and markers.
 */
function showRoute() {
  polyline.addTo(map);
  startMarker.addTo(map);
  endMarker.addTo(map);
}

/**
 * Updates the locations of the polyline and markers of the displayed route.
 *
 * @param waypoints the waypoints that are used to update the route.
 */
function updateRoute(waypoints: L.LatLng[]) {
  polyline.setLatLngs(waypoints);
  startMarker.setLatLng(waypoints[0]);
  endMarker.setLatLng(waypoints[waypoints.length - 1]);
}
// update the polyline when current route changes
watchEffect(async () => {
  const route = $dm.value.currentData.getRoute();
  if (route) {
    // update polyline
    const customWaypoints = await $dm.value.getRouteWaypoints(route);
    const waypoints = toLeafletLatLngArray(customWaypoints);
    updateRoute(waypoints);
    showRoute();
  } else {
    hideRoute();
  }
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

  const vehicles = $dm.value.vehicles;
  const markers = generateAllVehicleMarkers(vehicles);
  markers.forEach((marker) => {
    marker.addTo(markersLayer);
  });
  return markersLayer;
}

/**
 * When the user clicks on an empty spot on the map, this will be called.
 * It deselects the current data references and hides the route of the previously selected vehicle.
 *
 * @param e the event that was triggered
 */
function emptySpotClicked(e: LeafletEvent) {
  $dm.value.currentData.unsetReferences();
  // navigate back to welcome page on data viewer
  router.push({
    name: "Welcome",
  });
  routingManager.hideRoute();
}

/**
 * Sets the currently selected vehicle in the data manager to the clicked vehicle.
 *
 * @param event the layer event of the clicked marker
 */
function vehicleMarkerClicked(event: LeafletEvent) {
  const marker = event.propagatedFrom as VehicleMarker;
  const vehicle = marker.vehicle;
  $dm.value.updateByVehicle(vehicle);
  //routingManager.showRoute(vehicle.id);

  // navigate to Default Data View
  router.push({
    name: "Default",
  });
}
</script>

<template>
  <div id="leafletMap"></div>
</template>

<style>
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
.leaflet-control-container .leaflet-routing-container-hide {
  display: none;
}
</style>
