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
      class="container-fluid bd-gutter flex-wrap flex-lg-nowrap justify-content-between align-items-center"
    >
      <div class="d-flex">
        <RouterLink to="/" class="navbar-brand display-4"
          ><i class="fa-solid fa-lock fa-fw"></i>
          {{ $t("app.confidentiality-visualizer") }}</RouterLink
        >
        <StartButton />
      </div>

      <div class="d-flex">
        <RolesToggleBar />
      </div>

      <div class="d-flex p-2">
        <button
          class="btn btn-light btn-lg"
          @click="dataViewerVisible = !dataViewerVisible"
        >
          <span class="lead">{{ $t("app.toggle-data-viewer") }}</span>
        </button>
        <div class="vr"></div>
        <span class="d-flex justify-content-center">
          <LocaleChanger />
        </span>
        <div class="vr"></div>
        <button
          class="btn btn-light btn-md"
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
