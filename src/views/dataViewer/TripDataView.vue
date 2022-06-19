<script setup lang="ts">
import { User } from "@/backend/dataFields";
import { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
const dataMananger = new DataManager();
var user1 = dataMananger.users[0];

var dataModule = new DataModule(user1);
</script>

<template>
  <div v-for="(value, key) in dataModule.displayedData" :key="key">
    {{ key }}: {{ value }}
  </div>
</template>
