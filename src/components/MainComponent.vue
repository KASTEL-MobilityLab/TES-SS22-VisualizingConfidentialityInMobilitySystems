<script setup lang="ts">
import type { MarkerManager } from "@/animation/MarkerManager";
import type { DataManager } from "@/backend/DataManager";
import MapComponent from "@/components/MapComponent.vue";
import { dataManagerKey, markerManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import { RouterView } from "vue-router";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
const $mm = inject(markerManagerKey) as Ref<MarkerManager>;
await $dm.value.init();
$mm.value.init($dm.value.vehicles);
</script>

<template>
  <MapComponent />
  <div
    class="d-flex col-lg-4 col-md-0 col-sm-0 offset-lg-7 offset-md-2 offset-sm-0"
  >
    <RouterView />
  </div>
</template>
