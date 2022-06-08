<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col m-5">
        <RouterLink to="rider" class="link-dark">Rider Data</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="payment" class="link-dark">Payment Data</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="vehicle" class="link-dark">Vehicle Data</RouterLink>
      </div>
    </div>
    <div class="row">
      <div class="col m-5">
        <RouterLink to="trip" class="link-dark">Trip Data</RouterLink>
      </div>
    </div>
  </div>
</template>
