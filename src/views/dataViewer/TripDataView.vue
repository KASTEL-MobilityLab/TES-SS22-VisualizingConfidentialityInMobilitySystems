<script setup lang="ts">
import { AvailableData, DataLoader } from "@/backend/DataLoader";
import { DataModule } from "@/backend/dataModules/DataModule";
//Preliminary use of the DataLoader instead of the DataManager due to not defined placement of every accessible DataManager
const dataLoader = new DataLoader({
  companyPath: AvailableData.companies,
  userPath: AvailableData.users,
  vehiclePath: AvailableData.vehicles,
  routePath: AvailableData.routes,
  tripPath: AvailableData.trips,
  riskPath: AvailableData.risks,
  paymentPath: AvailableData.payments,
});

var users = await dataLoader.loadAllUsers();
var dataModule = new DataModule(users[0]);
</script>

<template>
  <div v-for="(value, key) in dataModule.displayedData" :key="key">
    {{ key }}: {{ value }}
  </div>
</template>
