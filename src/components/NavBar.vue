<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import { RouterLink } from "vue-router";
import LocaleChanger from "./LocaleChanger.vue";
import UserDropdownVue from "./navBarComponents/UserDropdown.vue";
import CompanyDropDownVue from "./navBarComponents/CompanyDropdown.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light py-3">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand display-4"
        ><i class="fa-solid fa-lock fa-fw"></i>
        {{ $t("app.confidentiality-visualizer") }}</RouterLink
      >
      <ul class="navbar-nav">
        <UserDropdownVue />
        <li class="nav-item">
          <span class="nav-link active">{{ $t("app.city") }}</span>
        </li>
        <CompanyDropDownVue />
      </ul>
      <div class="d-flex-inline">
        <span class="navbar-brand m-4 display-4">
          <LocaleChanger />
        </span>
        <div class="vr"></div>
        <RouterLink to="/" class="navbar-brand m-4 display-4"
          >{{ $t("app.help") }}<i class="fa-solid fa-question fa-sm fa-fw"></i
        ></RouterLink>
      </div>
    </div>
  </nav>
</template>
