<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col m-5">
        <RouterLink to="rider" class="link-dark">{{
          $t("app.dataViews.riderDataView")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="payment" class="link-dark">{{
          $t("app.dataViews.paymentDataView")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="vehicle" class="link-dark">{{
          $t("app.dataViews.vehicleDataView")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="trip" class="link-dark">{{
          $t("app.dataViews.tripDataView")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
