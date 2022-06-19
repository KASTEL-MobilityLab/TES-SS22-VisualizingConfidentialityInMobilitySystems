<script setup lang="ts">
import { User } from "@/backend/dataFields";
import { DataModule } from "@/backend/dataModules/DataModule";

var user1 = new User(
  "U01",
  "Max",
  "Mustermann",
  "015731371721",
  "MaxMustermann@gmail.com"
);

var dataModule = new DataModule(user1);
</script>

<template>
  <div v-for="(value, key) in dataModule.displayedData" :key="key">
    {{ key }}: {{ value }}
  </div>
</template>
