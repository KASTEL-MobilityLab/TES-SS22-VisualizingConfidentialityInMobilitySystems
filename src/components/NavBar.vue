<script setup lang="ts">
import { inject } from "vue";
import { RouterLink } from "vue-router";
import LocaleChanger from "./LocaleChanger.vue";
import RolesToggleBar from "./RolesToggleBar.vue";
import StartButton from "./StartButton.vue";
const dataViewerVisible = inject("dataViewerVisible");
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light py-3">
    <div class="container-fluid">
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
      <RolesToggleBar />
      <div class="d-flex-inline">
        <span class="navbar-brand m-4 display-4">
          <LocaleChanger />
        </span>
        <div class="vr"></div>
        <button
          class="btn btn-light btn-md"
          type="button"
          data-bs-target="#helpModal"
          data-bs-toggle="modal"
        >
          {{ $t("app.help") }}
          <i class="fa-solid fa-question fa-sm fa-fw"></i>
        </button>
      </div>
    </div>
  </nav>
</template>
