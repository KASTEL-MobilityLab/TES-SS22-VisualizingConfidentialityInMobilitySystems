<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { provide, ref } from "vue";
import ExplanationModal from "./components/ExplanationModal.vue";
import HelpModal from "./components/HelpModal.vue";
import MainComponent from "./components/MainComponent.vue";

const dataViewerVisible = ref(true);
provide("dataViewerVisible", dataViewerVisible);
</script>

<template>
  <NavBar />
  <main>
    <Suspense>
      <MainComponent />
    </Suspense>
  </main>
  <!-- Define Modals here -->
  <ExplanationModal />
  <HelpModal />
</template>
