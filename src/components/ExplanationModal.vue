<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { getTranslationKeyForDataType } from "@/utils/translationUtils";
import { inject, type Ref } from "vue";

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
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <span>
            <p class="value">
              {{ $t("explanation.risk_of_rider_identification") }}
            </p>
          </span>
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
