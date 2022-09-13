<script setup lang="ts">
import { useI18n } from "vue-i18n";
const i18n = useI18n();

/**
 * Switches the locale from english to german and vice versa.
 */
function switchLocale() {
  const locale = i18n.locale.value === "en" ? "de" : "en";
  i18n.locale.value = locale;
}
</script>

<template>
  <button class="btn btn-light btn-md" @click="switchLocale">
    <span class="lead"
      >{{ $i18n.locale.toUpperCase() }}
      <i class="fa-solid fa-globe fa-fw fa-lg"></i
    ></span>
  </button>
</template>
