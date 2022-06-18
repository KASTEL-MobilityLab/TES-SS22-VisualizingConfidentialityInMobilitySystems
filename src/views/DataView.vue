<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject } from "vue";
import { RouterView } from "vue-router";
const $dm = inject(dataManagerKey) as DataManager;
</script>

<template>
  <div class="container w-75 h-75 bg-light rounded">
    <h1 class="text-center p-3 fw-bold">
      <i class="fa-solid fa-database fa-fw"></i> {{ $t("app.dataViewer") }}
    </h1>

    <div class="text-center m-2">
      <!-- All nested views will be displayed in this div -->
      <RouterView />
      <div>{{ $dm.companies }}</div>
    </div>
  </div>
</template>
