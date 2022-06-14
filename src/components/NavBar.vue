<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar fixed-top navbar-expand-md navbar-light bg-light py-3">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand display-4"
        ><i class="fa-solid fa-lock fa-fw"></i> Confidentiality
        Visualizer</RouterLink
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
            User
          </a>
          <ul class="dropdown-menu">
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
      <div class="d-flex-inline">
        <span class="navbar-brand m-4 display-4"
          >EN <i class="fa-solid fa-globe fa-fw"></i
        ></span>
        <div class="vr"></div>
        <RouterLink to="/help" class="navbar-brand m-4 display-4"
          >Help <i class="fa-solid fa-question fa-sm fa-fw"></i
        ></RouterLink>
      </div>
    </div>
  </nav>
</template>
