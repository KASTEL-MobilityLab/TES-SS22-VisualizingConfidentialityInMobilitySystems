<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>
<template>
  <div class="btn-group" role="group">
    <input id="UserRole" type="radio" class="btn-check" name="btnradio" />
    <label
      class="btn btn-outline-dark"
      for="UserRole"
      @click="$dm.changeRole('User')"
      ><i class="fa-solid fa-user fa-fw"></i> {{ $t("app.user") }}</label
    >

    <input
      id="CityRole"
      type="radio"
      class="btn-check"
      name="btnradio"
      autocomplete="off"
      checked
    />
    <label
      class="btn btn-outline-dark"
      for="CityRole"
      @click="$dm.changeRole('City')"
      ><i class="fa-solid fa-city fa-fw"></i> {{ $t("app.city") }}</label
    >

    <input id="CompanyRole" type="radio" class="btn-check" name="btnradio" />
    <label
      class="btn btn-outline-dark"
      for="CompanyRole"
      @click="$dm.changeRole('Company')"
      ><i class="fa-solid fa-building fa-fw"></i> {{ $t("app.company") }}</label
    >
  </div>
</template>
