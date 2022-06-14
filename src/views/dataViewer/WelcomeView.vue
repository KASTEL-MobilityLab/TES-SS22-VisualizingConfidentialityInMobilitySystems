<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const { t } = useI18n();
</script>

<template>
  <div class="container text-center">
    <h3>{{ t("welcome") }}</h3>

    <span>
      If you need help, click on the Help button in the top right corner.
    </span>

    <RouterLink to="default">Link to Default View</RouterLink>
  </div>
</template>
