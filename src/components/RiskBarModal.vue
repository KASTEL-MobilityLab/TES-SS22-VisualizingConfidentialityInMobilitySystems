<script setup lang="ts"></script>

<template>
  <div id="riskBarExplanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100">
            {{ "Explanation of the Risk Assessment of the Data Types" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <img
              class="center-block img-responsive"
              src="/data/graphics/RiskBarExplanation.png"
              alt=""
              style="max-height: 238px"
            />
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
