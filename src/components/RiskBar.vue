<script setup lang="ts"></script>

<template>
  <div
    id="RiskBar"
    class="btn-group"
    role="group"
    data-bs-toggle="modal"
    data-bs-target="#riskBarExplanationModal"
    aria-label="RiskBar toggle button group"
  >
    <input id="LowRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-success btn-lg" for="LowRisk">Low</label>

    <input id="MediumRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-warning btn-lg" for="MediumRisk">Medium</label>

    <input id="HighRisk" class="btn-check" autocomplete="off" />
    <label class="btn btn-danger btn-lg" for="HighRisk">High</label>
  </div>
</template>
