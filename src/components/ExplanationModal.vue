<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { DataType } from "@/backend/DataType";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;

function getTranslationKeyForDataType(dataType: DataType | undefined): string {
  if (!dataType) {
    return "";
  }
  return `data.${dataType}`;
}
</script>

<template>
  <div id="explanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Explanation for DataType
            {{ $t(getTranslationKeyForDataType($dm.currentRisk?.dataType)) }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <span>
            <p class="value">Risk of Rider Identification</p>
          </span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
