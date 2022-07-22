<script setup lang="ts">
import { getTranslationKeyForExplanation } from "@/utils/translationUtils";
import { computed, type ComputedRef, type Ref } from "@vue/reactivity";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import HelpCard from "./HelpCard.vue";
import HelpModal from "./HelpModal.vue";

// must use this if we want to use the translation function inside script setup
const { t } = useI18n();

const applicationGoalTitel: ComputedRef<string> = computed(() => {
  return t("About the App");
});

const applicationGoal: ComputedRef<string> = computed(() => {
  return t("This is the goal of the app");
});

const howToUseTitel: ComputedRef<string> = computed(() => {
  return t("How it works");
});

const howToUse: ComputedRef<string> = computed(() => {
  return t("This is how you use the app");
});

const availableInfoTitel: ComputedRef<string> = computed(() => {
  return t("What infos you can get");
});

const availableInfo: ComputedRef<string> = computed(() => {
  return t("These are the infos you can get from the app");
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex align-items-stretch">
        <HelpCard :title="applicationGoalTitel" :content="applicationGoal" />
      </div>
      <div v-if="howToUse" class="col d-flex align-items-stretch">
        <HelpCard :title="howToUseTitel" :content="howToUse" />
      </div>
      <div v-if="availableInfo" class="col d-flex align-items-stretch">
        <HelpCard :title="availableInfoTitel" :content="availableInfo" />
      </div>
    </div>
  </div>
</template>
