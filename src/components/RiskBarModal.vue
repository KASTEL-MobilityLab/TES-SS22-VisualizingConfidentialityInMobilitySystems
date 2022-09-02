<script setup lang="ts">
import InfoCard from "./InfoCard.vue";
</script>

<template>
  <div id="riskBarExplanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100">
            {{ $t("risk.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row row-cols-lg-3 row-cols-md-2 row-cols-1">
            <div class="col d-flex align-items-stretch mb-4 flex-fill">
              <InfoCard
                :title="$t('risk.low')"
                :subtitle="$t('risk.low_subtitle')"
                :content="$t('risk.low_explanation')"
              />
            </div>
            <div class="col d-flex align-items-stretch mb-4 flex-fill">
              <InfoCard
                :title="$t('risk.medium')"
                :subtitle="$t('risk.medium_subtitle')"
                :content="$t('risk.medium_explanation')"
              />
            </div>
            <div class="col d-flex align-items-stretch mb-4 flex-fill">
              <InfoCard
                :title="$t('risk.high')"
                :subtitle="$t('risk.high_subtitle')"
                :content="$t('risk.high_explanation')"
              />
            </div>
          </div>
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
