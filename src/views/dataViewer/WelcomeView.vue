<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container text-center">
    <h3>{{ $t("app.welcome") }}</h3>

    <span>
      If you need help, click on the Help button in the top right corner.
    </span>

    <RouterLink to="default">Link to Default View</RouterLink>
  </div>
</template>
