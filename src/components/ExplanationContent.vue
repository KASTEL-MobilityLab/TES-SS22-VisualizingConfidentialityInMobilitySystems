<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { Explanation } from "@/backend/riskManager";
import type { Risk } from "@/backend/riskManager/Risk";
import { dataManagerKey } from "@/keys";
import { getTranslationKeyForExplanation } from "@/utils/translationUtils";
import { computed, type ComputedRef, type Ref } from "@vue/reactivity";
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import ExplanationCard from "./ExplanationCard.vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
console.table($dm.value.currentRisk?.explanation?.isNotVisibleExplanation);

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

const roleVisibilityExplanation: ComputedRef<string> = computed(() => {
  const explanation = getCurrentExplanation();
  if (explanation) {
    return t(getTranslationKeyForExplanation(explanation.translationKey));
  } else {
    return "";
  }
});

const sourceString: ComputedRef<string> = computed(() => {
  const explanation = getCurrentExplanation();
  if (explanation && explanation.source) {
    return explanation.source;
  } else {
    return "";
  }
});

// gets the current explanation for the selected role and visibility
function getCurrentExplanation(): Explanation | undefined {
  const currentRole = $dm.value.currentRole;
  return $dm.value.currentRisk?.getExplanation(currentRole);
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ExplanationCard
          :title="
            $t(getTranslationKeyForExplanation('risk_of_rider_identification'))
          "
          :content="roleVisibilityExplanation"
          :source="sourceString"
        />
      </div>
      <div v-if="retentionPeriodString" class="col">
        <ExplanationCard
          :title="$t(getTranslationKeyForExplanation('retention_period'))"
          :content="retentionPeriodString"
        />
      </div>
    </div>
  </div>
</template>
