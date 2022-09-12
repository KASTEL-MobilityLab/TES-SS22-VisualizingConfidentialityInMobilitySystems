<script setup lang="ts">
import type { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey, markerManagerKey } from "@/keys";
import { fromLeafletLatLng, toLeafletLatLngArray } from "@/utils/latLngUtils";
import type { VehicleMarker } from "@/utils/leafletExtension";
import { RandomDataPrinter } from "@/utils/RandomDataPrinter";
import { RouteDisplay } from "@/utils/RouteDisplay";
import L, { type LeafletEvent } from "leaflet";
import { inject, onMounted, watch, type Ref } from "vue";
import { useRouter } from "vue-router";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
const $mm = inject(markerManagerKey) as Ref<MarkerManager>;
const router = useRouter();
let routeDisplay: RouteDisplay;
let map: L.Map;
let allMarkers: VehicleMarker[] = [];

// used to generate new data for the json files.
// behavior is controlled in the emptySpotClicked function
const randomDataPrinter = new RandomDataPrinter();

// setup the map and generate markers, when this component is mounted
onMounted(() => {
  map = setupMap();
  setupMarkers(map);
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
  const topLeft = new L.LatLng(49.049, 8.281);
  const bottomRight = new L.LatLng(48.954, 8.513);
  const center = new L.LatLng(49.00810234643429, 8.423063278198226);
  const bounds = new L.LatLngBounds(topLeft, bottomRight);

  const mapboxBasicDarker = L.tileLayer(
    "https://api.mapbox.com/styles/v1/moritzm00/cl5nmjbva00eq14rzm7ssfss8/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
    {
      accessToken: import.meta.env.VITE_MAPBOX_API_KEY,
      attribution: `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>`,
    }
  );

  return L.map("leafletMap", {
    center: center,
    zoom: 14.45,
    minZoom: 13,
    maxZoom: 16,
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
  const markers = $mm.value.allMarkers;
  markers.forEach((marker) => {
    marker.addTo(markersLayer);
    allMarkers.push(marker);
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
  $mm.value.deselectMarker();
  // navigate back to welcome page on data viewer
  router.push({
    name: "Welcome",
  });
  // guard, don't print in production mode.
  if (import.meta.env.DEV) {
    // run data utility

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newPosition = fromLeafletLatLng((e as any).latlng);
    randomDataPrinter.addWayPointToCurrentRoute(newPosition);

    // uncomment the ones you want to print

    // randomDataPrinter.printUsers(10, 6);
    // randomDataPrinter.printCurrentRoute();
    // randomDataPrinter.printIndividualRoutes(10, 10);
    // randomDataPrinter.printCompanies(10, 15);
    // randomDataPrinter.printPayments(10, 6, 6);
    // randomDataPrinter.printVehicles(10, 10);
  }
}

/**
 * Sets the currently selected vehicle in the data manager to the clicked vehicle and starts the animation of the marker.
 *
 * @param event the layer event of the clicked marker
 */
async function vehicleMarkerClicked(event: LeafletEvent) {
  const marker = event.propagatedFrom as VehicleMarker;
  const vehicle = marker.vehicle;

  $mm.value.deselectMarker();
  $mm.value.highlightCurrentMarker(marker);

  $dm.value.updateByVehicle(vehicle);
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

.vehicle-icon {
  color: black;
}
.vehicle-icon.selected-marker {
  color: rgb(189, 56, 56);
}
</style>
