<script setup lang="ts">
import { inject } from "vue";
import { RouterLink } from "vue-router";
import LocaleChanger from "./LocaleChanger.vue";
import RolesToggleBar from "./RolesToggleBar.vue";
import StartButton from "./StartButton.vue";
const dataViewerVisible = inject("dataViewerVisible");
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div
      class="d-flex container-fluid justify-content-between align-items-center"
    >
      <div class="d-flex">
        <RouterLink to="/" class="navbar-brand display-4"
          ><i class="fa-solid fa-lock fa-fw"></i>
          {{ $t("app.confidentiality-visualizer") }}</RouterLink
        >
        <StartButton />
        <button
          class="btn btn-light btn-md btn-outline-dark"
          @click="dataViewerVisible = !dataViewerVisible"
        >
          {{ $t("app.toggle-data-viewer") }}
        </button>
      </div>

      <div class="d-flex">
        <RolesToggleBar />
      </div>

      <div class="d-flex">
        <span class="navbar-brand display-4">
          <LocaleChanger />
        </span>
        <div class="vr"></div>
        <button
          class="btn btn-light btn-sm"
          type="button"
          data-bs-target="#helpModal"
          data-bs-toggle="modal"
        >
          <span class="navbar-brand display-4">{{ $t("app.help") }}</span>
          <i class="fa-solid fa-question fa-lg fa-fw"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
