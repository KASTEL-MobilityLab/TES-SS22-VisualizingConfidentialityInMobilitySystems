<script setup lang="ts">
import { User } from "@/backend/dataFields";
import { UserDataModule } from "@/backend/dataModules/UserDataModule";
import { RiskManager } from "@/backend/RiskManager";
import { Role } from "@/backend/roles";

var user1 = new User(
  "U01",
  "Max",
  "Mustermann",
  "015731371721",
  "MaxMustermann@gmail.com"
);
var riskManager = new RiskManager();
var currentRole = Role.city;
var userDataModule = new UserDataModule(
  "UDM01",
  user1,
  riskManager,
  currentRole
);
var userDataPackage1 = userDataModule.getFirstUserDataPackage();
</script>

<template>
  <li v-for="(value, fieldName) in userDataPackage1" :key="fieldName">
    {{ value }}
  </li>
</template>
