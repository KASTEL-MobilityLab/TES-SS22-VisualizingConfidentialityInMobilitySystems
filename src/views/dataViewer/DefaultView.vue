<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col m-5">
        <RouterLink to="rider" class="link-dark">{{
          $t("data.riderData")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="payment" class="link-dark">{{
          $t("data.paymentData")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="vehicle" class="link-dark">{{
          $t("data.vehicleData")
        }}</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="trip" class="link-dark">{{
          $t("data.tripData")
        }}</RouterLink>
      </div>
    </div>
  </div>
</template>
