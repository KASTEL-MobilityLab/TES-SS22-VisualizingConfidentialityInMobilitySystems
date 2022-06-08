<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="row">
    <div class="col text-center m-5">
      <RouterLink to="rider">Rider Data</RouterLink>
    </div>
  </div>
  <div class="row">
    <div class="col text-center m-5">
      <RouterLink to="payment">Payment Data</RouterLink>
    </div>
  </div>
  <div class="row">
    <div class="col text-center m-5">
      <RouterLink to="vehicle">Vehicle Data</RouterLink>
    </div>
  </div>
  <div class="row">
    <div class="col text-center m-5">
      <RouterLink to="trip">Trip Data</RouterLink>
    </div>
  </div>
</template>
