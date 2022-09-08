<script setup lang="ts">
import type { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey, markerManagerKey } from "@/keys";
import { inject, watch, type Ref } from "vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
const $mm = inject(markerManagerKey) as Ref<MarkerManager>;

watch(
  () => $dm.value.vehicles,
  (currentValue) => {
    let values = Array.from($mm.value.vehicleMarkerMap.values());
    let keys = Array.from($mm.value.vehicleMarkerMap.keys());
    for (let i = 0; i < $dm.value.vehicles.length; i++) {
      $mm.value.updatePosition(values[i], keys[i], currentValue);
    }
  },
  { deep: true }
);

/**
 * Starts the animation of the vehicles.
 */
function buttonStartAnimation() {
  $dm.value.startAnimation();
}

/**
 * Pauses the animation of the vehicles.
 */
function buttonPauseAnimation() {
  $dm.value.stopAnimation();
}

/**
 * Resets the animation by moving the vehicles back to the starting positions.
 */
function buttonResetAnimation() {
  $dm.value.resetAnimation();
}
</script>
<template>
  <div
    v-if="!$dm.getIsRunning()"
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
    v-else
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
      {{ $t("app.reset") }}
    </button>
  </div>
</template>
