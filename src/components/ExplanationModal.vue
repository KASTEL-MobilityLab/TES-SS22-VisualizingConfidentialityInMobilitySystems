<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { getRiskColor } from "@/backend/riskManager/RiskColor";
import { dataManagerKey } from "@/keys";
import { getTranslationKeyForDataType } from "@/utils/translationUtils";
import { computed } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import ExplanationContent from "./ExplanationContent.vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;

const currentDataType = computed(() => {
  const risk = $dm.value.getCurrentRisk();
  if (risk) {
    return getTranslationKeyForDataType(risk.dataType);
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
              v-if="$dm.getCurrentRisk()"
              class="badge"
              :class="`bg-${getRiskColor($dm.getCurrentRisk().riskLevel)}`"
              >{{ $dm.getCurrentRisk().riskLevel }}</span
            >
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div v-if="$dm.getCurrentRisk()" class="modal-body">
          <ExplanationContent :risk="$dm.getCurrentRisk()" />
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
