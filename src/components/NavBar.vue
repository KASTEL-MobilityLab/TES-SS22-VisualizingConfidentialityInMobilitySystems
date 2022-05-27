<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navigation Bar</a>
    <div class="navbar-nav">
      <div class="navbar-item"><RouterLink to="/">Home</RouterLink></div>
      <div class="navbar-item"><RouterLink to="/help">Help</RouterLink></div>
    </div>
  </nav>
</template>
