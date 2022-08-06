<script setup lang="ts">
import { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { toLeafletLatLngArray } from "@/utils/latLngUtils";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { generateAllVehicleMarkers } from "@/utils/markerUtils";
import { RouteDisplay } from "@/utils/RouteDisplay";
import L, { type LeafletEvent } from "leaflet";
import { inject, onMounted, watch, type Ref } from "vue";
import { useRouter } from "vue-router";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
const router = useRouter();
const RELOAD_TIME = 450;
let routeDisplay: RouteDisplay;
let map: L.Map;
const markerManager: MarkerManager = new MarkerManager($dm.value.vehicles);

// setup the map and generate markers, when this component is mounted
onMounted(() => {
  map = setupMap();
  const markersLayer = setupMarkers(map);
  map.on("click", emptySpotClicked);
  routeDisplay = new RouteDisplay(map);
});

// update the polyline when current route changes
watch(() => $dm.value.currentData.getRoute(), onRouteUpdate);
/**
 * Called, when the current route changes.
 * Hides or shows the route, depending on whether the route is set.
 */
async function onRouteUpdate() {
  const route = $dm.value.currentData.getRoute();
  if (route) {
    // update polyline
    const customWaypoints = await $dm.value.getRouteWaypoints(route);
    const waypoints = toLeafletLatLngArray(customWaypoints);
    routeDisplay.showRoute(waypoints);
  } else {
    routeDisplay.hideRoute();
  }
}
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

  const mapboxBasicDarker = L.tileLayer(
    "https://api.mapbox.com/styles/v1/moritzm00/cl5nmjbva00eq14rzm7ssfss8/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
    {
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
      attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`,
    }
  );

  return L.map("leafletMap", {
    center: bounds.getCenter(),
    zoom: 14.45,
    minZoom: 13,
    maxZoom: 16,
    //layers: [stamenWaterColor, mapLabels],
    layers: [mapboxBasicDarker],
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
 * Animates the marker of the currently selected marker.
 */
async function animateMarker(event: LeafletEvent) {
  const marker = event.propagatedFrom as VehicleMarker;
  const route = $dm.value.currentData.getRoute();
  if (route) {
    const customWaypoints = await $dm.value.getRouteWaypoints(route);
    const waypoints = toLeafletLatLngArray(customWaypoints);
    waypoints.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, RELOAD_TIME * index);
    });
  }
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
}

/**
 * Sets the currently selected vehicle in the data manager to the clicked vehicle and starts the animation of the marker.
 *
 * @param event the layer event of the clicked marker
 */
async function vehicleMarkerClicked(event: LeafletEvent) {
  const marker = event.propagatedFrom as VehicleMarker;
  const vehicle = marker.vehicle;
  $dm.value.updateByVehicle(vehicle);
  //animateMarker(event);
  $dm.value.startAnimation();
  /*
  watch($dm.value.vehicles, (currentValue, oldValue) => {
    markerManager.updatePosition(marker, "V01", currentValue);
  });
  */
  watch(
    () => $dm.value.vehicles,
    (currentValue) => {
      markerManager.updatePosition(marker, "V01", currentValue);
      /*
      for (const vehicle of currentValue) {
        markerManager.updatePosition(marker, vehicle.id, currentValue);
      }
      */
    },
    { deep: true }
  );
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

.route-polyline {
  stroke: steelblue;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 7;
  fill: none;
  stroke-opacity: 1;
}
</style>
