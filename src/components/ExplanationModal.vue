<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { getRiskColor } from "@/backend/riskManager/RiskColor";
import { DATA_MANAGER_KEY } from "@/keys";
import { getTranslationKeyForDataType } from "@/utils/translationUtils";
import { computed } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import ExplanationContent from "./ExplanationContent.vue";

const $dm = inject(DATA_MANAGER_KEY) as Ref<DataManager>;

const currentRisk = computed(() => $dm.value.getCurrentRisk());

const currentDataType = computed(() => {
  if (currentRisk.value) {
    return getTranslationKeyForDataType(currentRisk.value.dataType);
  } else {
    return "";
  }
});
</script>

<template>
  <div id="explanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100">
            {{
              $t("explanation.title", {
                dataType: $t(currentDataType),
              })
            }}
            <span
              v-if="currentRisk?.dataType"
              class="badge"
              :class="`bg-${getRiskColor(currentRisk.riskLevel)}`"
              >{{ currentRisk.riskLevel }}</span
            >
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div v-if="currentRisk" class="modal-body">
          <ExplanationContent :risk="currentRisk" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ $t("app.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
