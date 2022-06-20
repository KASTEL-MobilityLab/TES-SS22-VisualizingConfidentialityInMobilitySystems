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
const riskColor = {
  id: "text-success",
  forename: "text-warning",
  surname: "text-warning",
  phoneNumber: "text-warning",
  email: "text-warning",
};
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <template v-for="(value, key) in dataModule.displayedData" :key="key">
    <!-- div class="riskColor[key]"> -->
    <div class="row m-2 p-2">
      <div class="col m-2 fw-bold">
        {{ key }}
      </div>
      <div class="col m-2">
        {{ value }}
      </div>
    </div>
    <!-- </div> -->
  </template>
</template>
