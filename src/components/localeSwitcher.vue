<script setup lang="ts">
import { useI18n } from "vue-i18n";
const i18n = useI18n();

function switchLocale() {
  const locale = i18n.locale.value === "en" ? "de" : "en";
  i18n.locale.value = locale;
}
</script>

<template>
  <button class="btn btn-light btn-lg" @click="switchLocale">
    {{ i18n.locale.value.toUpperCase() }}
    <i class="fa-solid fa-globe fa-fw"></i>
  </button>
</template>
