<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <li class="nav-item active dropdown">
    <a
      id="navbarDropdown"
      class="nav-link active dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
    >
      {{ $t("app.user") }}
    </a>
    <ul class="dropdown-menu">
      <li>
        <a class="dropdown-item" href="#"
          ><button @click="$dm.changeRole('User')">User 1</button></a
        >
      </li>
    </ul>
  </li>
</template>
