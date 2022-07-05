<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import MainComponent from "./components/MainComponent.vue";
</script>

<template>
  <main>
    <NavBar />
    <div class="outer-wrap">
      <Suspense>
        <MainComponent />
      </Suspense>
    </div>
  </main>
</template>
<style scoped>
.outer-wrap {
  /* Must have some sort of height and width so that
    inner children (map and overlay) can position
    themselves to it */
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: 0;
}
</style>
