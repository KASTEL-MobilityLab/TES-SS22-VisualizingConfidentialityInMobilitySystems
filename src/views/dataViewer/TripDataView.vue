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
var userDataModule = new UserDataModule(user1);
var userDataPackage1 = userDataModule.getFirstUserDataPackage();
var stringTest = user1["_id"];
var listPropertyNames = Object.keys(user1);
console.log(stringTest);
console.log(listPropertyNames);
</script>

<template>
  <li v-for="(value, fieldName) in userDataPackage1" :key="fieldName">
    {{ value }}
  </li>
</template>
