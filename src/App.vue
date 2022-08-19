<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import ExplanationModal from "./components/ExplanationModal.vue";
import HelpModal from "./components/HelpModal.vue";
import MainComponent from "./components/MainComponent.vue";
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
