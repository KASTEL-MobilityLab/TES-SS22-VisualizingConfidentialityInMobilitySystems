<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container w-75 h-75 bg-light rounded">
    <h1 class="text-center p-3">Data Viewer</h1>

    <div class="text-center m-2">
      <RouterView />
    </div>
  </div>
</template>
