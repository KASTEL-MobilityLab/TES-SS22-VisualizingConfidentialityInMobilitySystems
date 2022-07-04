<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { Risk } from "@/backend/riskManager/Risk";
import { dataManagerKey } from "@/keys";
import { getTranslationKeyForExplanation } from "@/utils/translationUtils";
import { computed, type ComputedRef, type Ref } from "@vue/reactivity";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import ExplanationCard from "./ExplanationCard.vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;

// must use this if we want to use the translation function inside script setup
const { t } = useI18n();

const props = defineProps<{
  risk: Risk;
}>();

const retentionPeriodString: ComputedRef<string> = computed(() => {
  const period = props.risk?.explanation?.retentionPeriod;
  switch (typeof period) {
    case "string":
      return t(getTranslationKeyForExplanation(period));
    case "number":
      return t(getTranslationKeyForExplanation("data_stored_for_duration"), {
        duration: t("app.day", { count: period }),
      });
    default:
      return "";
  }
});

const riskOfIdentificationString: ComputedRef<string> = computed(() => {
  const currentRole = $dm.value.currentRole;
  const isVisible = props.risk.isVisible(currentRole);
  const key = `data_is${isVisible ? "" : "_not"}_visible`;
  return t(getTranslationKeyForExplanation(key), { role: currentRole });
});
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ExplanationCard
          :title="
            $t(getTranslationKeyForExplanation('risk_of_rider_identification'))
          "
          :content="riskOfIdentificationString"
        />
      </div>
      <div v-if="retentionPeriodString" class="col">
        <ExplanationCard
          :title="$t(getTranslationKeyForExplanation('retentionPeriod'))"
          :content="retentionPeriodString"
        />
      </div>
    </div>
  </div>
</template>
