<script setup lang="ts">
import { provide, ref } from "vue";
import ExplanationModal from "./components/ExplanationModal.vue";
import HelpModal from "./components/HelpModal.vue";
import MainComponent from "./components/MainComponent.vue";
import NavBar from "./components/NavBar.vue";

const dataViewerVisible = ref(true);
provide("dataViewerVisible", dataViewerVisible);
</script>

<template>
  <header>
    <NavBar />
  </header>
  <main>
    <Suspense>
      <MainComponent />
    </Suspense>
  </main>
  <!-- Define Modals here -->
  <ExplanationModal />
  <HelpModal />
</template>
