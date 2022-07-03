<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const RIDER_DATA_VIEW_DECLARATION = "Rider Data View";
var users = $dm.value.users;
var dataModule = new DataModule(users[0], $dm.value.riskManager);
</script>

<template>
  <DataModuleVue
    :data-module="dataModule"
    :data-field-name="RIDER_DATA_VIEW_DECLARATION"
  />
</template>
