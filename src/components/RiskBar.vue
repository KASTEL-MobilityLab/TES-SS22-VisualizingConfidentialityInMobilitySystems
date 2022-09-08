<script setup lang="ts"></script>

<template>
  <div
    id="RiskBar"
    class="btn-group p-4"
    role="group"
    data-bs-toggle="modal"
    data-bs-target="#riskBarExplanationModal"
    aria-label="RiskBar toggle button group"
  >
    <input id="LowRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-success btn-lg" for="LowRisk">{{
      $t("risk.low")
    }}</label>

    <input id="MediumRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-warning btn-lg" for="MediumRisk">{{
      $t("risk.medium")
    }}</label>

    <input id="HighRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-danger btn-lg" for="HighRisk">{{
      $t("risk.high")
    }}</label>
  </div>
</template>
