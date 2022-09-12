<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { computed, inject, type Ref } from "vue";
import { RouterLink } from "vue-router";

const $dm = inject(dataManagerKey) as Ref<DataManager>;

const isActiveCheck = computed(() => {
  const vehicle = $dm.value.currentData.getVehicle();
  if (vehicle) {
    return vehicle.isActive();
  }
  return true;
});
</script>

<template>
  <div class="container">
    <div class="row m-5">
      <div class="col">
        <div v-if="isActiveCheck">
          <RouterLink to="rider" class="link-dark">
            <button
              type="button"
              class="btn btn-dark btn-lg w-100"
              style="
                --bs-btn-padding-y: 1rem;
                --bs-btn-padding-x: 2rem;
                --bs-btn-font-size: 1.2rem;
              "
            >
              <i class="fa-solid fa-id-card"></i>
              {{ $t("app.dataViews.riderDataView") }}
            </button>
          </RouterLink>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-dark btn-lg w-100 disabled"
            style="
              --bs-btn-padding-y: 1rem;
              --bs-btn-padding-x: 2rem;
              --bs-btn-font-size: 1.2rem;
            "
          >
            <i class="fa-solid fa-id-card"></i>
            {{ $t("app.dataViews.riderDataView") }}
          </button>
        </div>
      </div>
      <div class="col">
        <div v-if="isActiveCheck">
          <RouterLink to="payment" class="link-dark">
            <button
              type="button"
              class="btn btn-dark btn-lg w-100"
              style="
                --bs-btn-padding-y: 1rem;
                --bs-btn-padding-x: 2rem;
                --bs-btn-font-size: 1.2rem;
              "
            >
              <i class="fa-solid fa-sack-dollar"></i>
              {{ $t("app.dataViews.paymentDataView") }}
            </button>
          </RouterLink>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-dark btn-lg w-100 disabled"
            style="
              --bs-btn-padding-y: 1rem;
              --bs-btn-padding-x: 2rem;
              --bs-btn-font-size: 1.2rem;
            "
          >
            <i class="fa-solid fa-sack-dollar"></i>
            {{ $t("app.dataViews.paymentDataView") }}
          </button>
        </div>
      </div>
    </div>
    <div class="row m-5">
      <div class="col">
        <RouterLink to="vehicle" class="link-dark">
          <button
            type="button"
            class="btn btn-dark btn-lg w-100"
            style="
              --bs-btn-padding-y: 1rem;
              --bs-btn-padding-x: 2rem;
              --bs-btn-font-size: 1.2rem;
            "
          >
            <i class="fa-solid fa-car"></i>
            {{ $t("app.dataViews.vehicleDataView") }}
          </button>
        </RouterLink>
      </div>
      <div class="col">
        <div v-if="isActiveCheck">
          <RouterLink to="trip" class="link-dark">
            <button
              type="button"
              class="btn btn-dark btn-lg w-100"
              style="
                --bs-btn-padding-y: 1rem;
                --bs-btn-padding-x: 2rem;
                --bs-btn-font-size: 1.2rem;
              "
            >
              <i class="fa-solid fa-road"></i>
              {{ $t("app.dataViews.tripDataView") }}
            </button>
          </RouterLink>
        </div>
        <div v-else>
          <button
            type="button"
            class="btn btn-dark btn-lg w-100 disabled"
            style="
              --bs-btn-padding-y: 1rem;
              --bs-btn-padding-x: 2rem;
              --bs-btn-font-size: 1.2rem;
            "
          >
            <i class="fa-solid fa-road"></i>
            {{ $t("app.dataViews.tripDataView") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
