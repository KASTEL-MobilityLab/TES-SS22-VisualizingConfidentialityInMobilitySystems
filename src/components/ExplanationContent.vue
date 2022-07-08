<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { Risk } from "@/backend/riskManager/Risk";
import type { RiskExplanation } from "@/backend/riskManager/RiskExplanation";
import type { Explanation } from "@/backend/riskManager/types";
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

const visibilityExplanationTitle: ComputedRef<string> = computed(() => {
  const param = { role: $dm.value.currentRole };
  if (getCurrentVisibility()) {
    return t(
      getTranslationKeyForExplanation("why_is_this_visible_to_me"),
      param
    );
  } else {
    return t(
      getTranslationKeyForExplanation("why_is_this_not_visible_to_me"),
      param
    );
  }
});

const visibilityExplanation: ComputedRef<string> = computed(() => {
  const explanation = getCurrentVisibilityExplanation();
  const dataType = $dm.value.currentRisk?.dataType;
  if (explanation && dataType) {
    return t(
      getTranslationKeyForExplanation(dataType, explanation.translationKey)
    );
  } else {
    return "";
  }
});

const visibilityExplanationSource: ComputedRef<string> = computed(() => {
  const explanation = getCurrentVisibilityExplanation();
  if (explanation && explanation.source) {
    return explanation.source;
  } else {
    return "";
  }
});

const riskLevelExplanationSource: ComputedRef<string> = computed(() => {
  const explanation = getCurrentExplanation()?.riskLevelExplanation;
  if (explanation && explanation.source) {
    return explanation.source;
  } else {
    return "";
  }
});

const riskLevelExplanation: ComputedRef<string> = computed(() => {
  const riskExplanation: RiskExplanation | undefined = getCurrentExplanation();
  if (riskExplanation) {
    return t(
      getTranslationKeyForExplanation(
        riskExplanation.riskLevelExplanation?.translationKey
      )
    );
  } else {
    return "";
  }
});

function getCurrentVisibility() {
  const currentRole = $dm.value.currentRole;
  const isVisible: boolean | undefined =
    $dm.value.currentRisk?.isVisible(currentRole);
  return isVisible;
}

// gets the current risk explanation
function getCurrentExplanation(): RiskExplanation | undefined {
  return $dm.value.currentRisk?.explanation;
}

function getCurrentVisibilityExplanation(): Explanation | undefined {
  const currentVisibility = getCurrentVisibility();
  if (currentVisibility) {
    return getCurrentExplanation()?.getVisibilityExplanation(currentVisibility);
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ExplanationCard
          :title="visibilityExplanationTitle"
          :content="visibilityExplanation"
          :source="visibilityExplanationSource"
        />
      </div>
      <div v-if="retentionPeriodString" class="col">
        <ExplanationCard
          :title="$t(getTranslationKeyForExplanation('retention_period'))"
          :content="retentionPeriodString"
        />
      </div>
      <div v-if="riskLevelExplanation" class="col">
        <ExplanationCard
          :title="$t(getTranslationKeyForExplanation('risk_level_explanation'))"
          :content="riskLevelExplanation"
          :source="riskLevelExplanationSource"
        />
      </div>
    </div>
  </div>
</template>
