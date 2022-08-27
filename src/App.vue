<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { provide, ref } from "vue";
import ExplanationModal from "./components/ExplanationModal.vue";
import HelpModal from "./components/HelpModal.vue";
import MainComponent from "./components/MainComponent.vue";
import RiskBar from "./components/RiskBar.vue";
import RiskBarModal from "./components/RiskBarModal.vue";

const dataViewerVisible = ref(true);
provide("dataViewerVisible", dataViewerVisible);
</script>

<template>
  <main>
    <NavBar />
    <div class="outer-wrap">
      <Suspense>
        <MainComponent />
      </Suspense>
    </div>
    <!-- The Modal must defined outside of the outer-wrap div because
    it the modal does not work if positioned inside a absolute parent-->
    <ExplanationModal />
    <HelpModal />
    <div class="position-relative">
      <div class="position-absolute bottom-0 start-0">
        <RiskBar />
        <RiskBarModal />
      </div>
    </div>
  </main>
</template>
