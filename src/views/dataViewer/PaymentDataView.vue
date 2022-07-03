<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
const PAYMENT_DATA_VIEW_DECLARATION = "Payment Data View";
var payments = $dm.value.payments;
var dataModule1 = new DataModule(payments[0], $dm.value.riskManager);
</script>

<template>
  <DataModuleVue
    :data-module="dataModule1"
    :data-field-name="PAYMENT_DATA_VIEW_DECLARATION"
  />
</template>
