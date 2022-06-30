<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
const $dm = inject(dataManagerKey) as Ref<DataManager>;
var users = $dm.value.users;
var dataModule = new DataModule(users[0], $dm.value.riskManager);
</script>

<template>
  <h4 class="text-center m-2">Rider Data</h4>
  <template v-for="(value, key) in dataModule.displayedData" :key="key">
    <div classs="my-buttons">
      <div class>
        <div class="row m-2 p-2">
          <div class="col m-2 fw-bold">
            <button type="button" :class="dataModule.risks[key]">
              {{ $t(key) }}
            </button>
          </div>
          <div class="col m-2">
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
