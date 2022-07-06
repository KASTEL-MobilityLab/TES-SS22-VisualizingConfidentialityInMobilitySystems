<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { Explanation } from "@/backend/riskManager";
import type { Risk } from "@/backend/riskManager/Risk";
import type { RiskExplanation } from "@/backend/riskManager/RiskExplanation";
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

const roleVisibilityTitle: ComputedRef<string> = computed(() => {
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

const roleVisibilityExplanation: ComputedRef<string> = computed(() => {
  const explanation = getCurrentRoleVisibilityExplanation();
  const dataType = $dm.value.currentRisk?.dataType;
  if (explanation && dataType) {
    return t(
      getTranslationKeyForExplanation(dataType, explanation.translationKey)
    );
  } else {
    return "";
  }
});

const roleExplanationSource: ComputedRef<string> = computed(() => {
  const explanation = getCurrentRoleVisibilityExplanation();
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
  if (isVisible === undefined) {
    throw new Error("isVisible is undefined");
  }
  return isVisible;
}

// gets the current risk explanation
function getCurrentExplanation(): RiskExplanation | undefined {
  return $dm.value.currentRisk?.explanation;
}

function getCurrentRoleVisibilityExplanation(): Explanation | undefined {
  const explanation: Explanation | undefined =
    getCurrentExplanation()?.getRoleExplanation(
      getCurrentVisibility(),
      $dm.value.currentRole
    );
  return explanation;
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ExplanationCard
          :title="roleVisibilityTitle"
          :content="roleVisibilityExplanation"
          :source="roleExplanationSource"
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
