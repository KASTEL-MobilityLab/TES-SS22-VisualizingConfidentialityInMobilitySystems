<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand"
        >Confidentiality Visualizer</RouterLink
      >
      <ul class="navbar-nav ms-auto me-auto">
        <li class="nav-item active dropdown">
          <a
            id="navbarDropdown"
            class="nav-link active dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
          >
            User
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">User1</a></li>
            <li><a class="dropdown-item" href="#">User2</a></li>
            <li><a class="dropdown-item" href="#">User3</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link active">City</span>
        </li>
        <li class="nav-item">
          <span class="nav-link active">Company</span>
        </li>
      </ul>
      <div class="d-flex">
        <span class="navbar-brand p-2">DE | EN</span>
        <div class="vr"></div>
        <RouterLink to="/help" class="navbar-brand p-2">Help</RouterLink>
      </div>
    </div>
  </nav>
</template>
