<script setup lang="ts">
import { RouterLink } from "vue-router";
import LocaleSwitcher from "./localeSwitcher.vue";
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light py-3">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand display-4"
        ><i class="fa-solid fa-lock fa-fw"></i>
        {{ $t("app.confidentiality-visualizer") }}</RouterLink
      >
      <ul class="navbar-nav">
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
            <li><a class="dropdown-item" href="#">User1</a></li>
            <li><a class="dropdown-item" href="#">User2</a></li>
            <li><a class="dropdown-item" href="#">User3</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link active">{{ $t("app.city") }}</span>
        </li>
        <li class="nav-item">
          <span class="nav-link active">{{ $t("app.company") }}</span>
        </li>
      </ul>
      <div class="d-flex-inline">
        <span class="navbar-brand m-4 display-4">
          <LocaleSwitcher />
        </span>
        <div class="vr"></div>
        <RouterLink to="/help" class="navbar-brand m-4 display-4"
          >{{ $t("app.help") }}<i class="fa-solid fa-question fa-sm fa-fw"></i
        ></RouterLink>
      </div>
    </div>
  </nav>
</template>
