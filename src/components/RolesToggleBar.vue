<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>
<template>
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <input
      id="btnradio1"
      type="radio"
      class="btn-check"
      name="btnradio"
      autocomplete="off"
    />
    <label
      class="btn btn-outline-dark"
      for="btnradio1"
      @click="$dm.changeRole('User')"
      >User</label
    >

    <input
      id="btnradio2"
      type="radio"
      class="btn-check"
      name="btnradio"
      autocomplete="off"
      checked
    />
    <label
      class="btn btn-outline-dark"
      for="btnradio2"
      @click="$dm.changeRole('City')"
      >City</label
    >

    <input
      id="btnradio3"
      type="radio"
      class="btn-check"
      name="btnradio"
      autocomplete="off"
    />
    <label
      class="btn btn-outline-dark"
      for="btnradio3"
      @click="$dm.changeRole('Company')"
      >Company</label
    >
  </div>
</template>
