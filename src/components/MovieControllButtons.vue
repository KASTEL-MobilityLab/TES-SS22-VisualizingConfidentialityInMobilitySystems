<script setup lang="ts">
import type { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey, markerManagerKey } from "@/keys";
import { inject, watch, type Ref } from "vue";

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const $mm = inject(markerManagerKey) as Ref<MarkerManager>;

function buttonStartAnimation() {
  $dm.value.startAnimation();
  watch(
    () => $dm.value.vehicles,
    (currentValue) => {
      for (let i = 0; i < $dm.value.vehicles.length; i++) {
        let values = Array.from($mm.value.vehicleMarkerMap.values());
        let keys = Array.from($mm.value.vehicleMarkerMap.keys());
        $mm.value.updatePosition(values[i], keys[i], currentValue);
      }
    },
    { deep: true }
  );
}

function buttonPauseAnimation() {
  $dm.value.stopAnimation();
}

function buttonResetAnimation() {
  $dm.value.resetAnimation();
}
</script>
<template>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <button
      type="button"
      class="btn btn-outline-dark"
      @click="buttonStartAnimation()"
    >
      Start
    </button>
  </div>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <button
      type="button"
      class="btn btn-outline-dark"
      @click="buttonPauseAnimation()"
    >
      Pause
    </button>
  </div>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <button
      type="button"
      class="btn btn-outline-dark"
      @click="buttonResetAnimation()"
    >
      Reset
    </button>
  </div>
</template>
