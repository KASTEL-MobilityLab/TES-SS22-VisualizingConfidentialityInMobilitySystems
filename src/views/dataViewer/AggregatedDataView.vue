<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
const TIME_METRIC = "Minutes";
const PRICE_METRIC = "EUR";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <div class="container text-center p-2">
    <h3>{{ $t("app.welcome.title") }}</h3>

    <nav class="flex-column lead">
      <p>
        {{ $t("app.aggregatedDataReasoning") }}
      </p>

      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <div class="keyValue__key">
            {{ $t("app.aggregatedData.numberOfActiveVehicles") }}
          </div>
        </div>
        <div class="keyValue__value">
          {{ $dm.aggregatedData.numberOfActiveVehicles }}
        </div>
      </div>

      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <div class="keyValue__key">
            {{ $t("app.aggregatedData.averageDuration") }}
          </div>
        </div>
        <div class="keyValue__value">
          {{ $dm.aggregatedData.averageDuration }} {{ TIME_METRIC }}
        </div>
      </div>

      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <div class="keyValue__key">
            {{ $t("app.aggregatedData.averagePrice") }}
          </div>
        </div>
        <div class="keyValue__value">
          {{ $dm.aggregatedData.averagePrice }} {{ PRICE_METRIC }}
        </div>
      </div>
    </nav>
  </div>
</template>
