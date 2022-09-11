<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="row m-5">
      <div class="col">
        <RouterLink to="rider">
          <button
            type="button"
            class="btn btn-dark btn-lg"
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
      <div class="col">
        <RouterLink to="payment" class="link-dark">
          <button
            type="button"
            class="btn btn-dark btn-lg"
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
    </div>
    <div class="row m-5">
      <div class="col">
        <RouterLink to="vehicle" class="link-dark">
          <button
            type="button"
            class="btn btn-dark btn-lg"
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
        <RouterLink to="trip" class="link-dark">
          <button
            type="button"
            class="btn btn-dark btn-lg"
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
    </div>
  </div>
</template>
