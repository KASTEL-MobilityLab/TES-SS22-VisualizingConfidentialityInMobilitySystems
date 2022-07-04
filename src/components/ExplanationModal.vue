<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { getRiskColor } from "@/backend/riskManager/RiskColor";
import { dataManagerKey } from "@/keys";
import { getTranslationKeyForDataType } from "@/utils/translationUtils";
import { inject, type Ref } from "vue";
import ExplanationContent from "./ExplanationContent.vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <div id="explanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{
              $t("explanation.title", {
                dataType: $t(
                  getTranslationKeyForDataType($dm.currentRisk?.dataType)
                ),
              })
            }}
            <span
              v-if="$dm.currentRisk"
              class="badge"
              :class="`bg-${getRiskColor($dm.currentRisk?.riskLevel)}`"
              >{{ $dm.currentRisk?.riskLevel }}</span
            >
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div v-if="$dm.currentRisk" class="modal-body">
          <ExplanationContent :risk="$dm.currentRisk" />
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
