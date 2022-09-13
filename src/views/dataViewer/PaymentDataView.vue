<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { DATA_MANAGER_KEY } from "@/keys";
import { computed, type ComputedRef } from "@vue/reactivity";
import { inject, type Ref } from "vue";
import DataModuleVue from "../../components/DataModule.vue";
const $dm = inject(DATA_MANAGER_KEY) as Ref<DataManager>;
const PAYMENT_DATA_VIEW_KEY = "app.dataViews.paymentDataView";

const currentPayment: ComputedRef<DataModule | undefined> = computed(() => {
  const payment = $dm.value.currentData.getPayment();
  if (payment) {
    return new DataModule(payment, $dm.value.riskManager);
  }
});
</script>

<template>
  <DataModuleVue
    :data-module="currentPayment"
    :data-field-name="PAYMENT_DATA_VIEW_KEY"
  />
</template>
