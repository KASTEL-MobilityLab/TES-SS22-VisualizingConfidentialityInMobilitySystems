<script setup lang="ts">
import { provide, ref } from "vue";
import ExplanationModal from "./components/ExplanationModal.vue";
import HelpModal from "./components/HelpModal.vue";
import MainComponent from "./components/MainComponent.vue";
import NavBar from "./components/NavBar.vue";

import RiskBarModal from "./components/RiskBarModal.vue";

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
    <!-- The Modal must defined outside of the outer-wrap div because
    it the modal does not work if positioned inside a absolute parent-->
    <ExplanationModal />
    <HelpModal />
    <RiskBarModal />
  </main>
</template>
