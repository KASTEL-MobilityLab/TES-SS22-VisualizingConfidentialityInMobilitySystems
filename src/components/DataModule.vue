<script setup lang="ts">
import type { DataField } from "@/backend/dataFields/DataField";
import type { DataManager } from "@/backend/DataManager";
import type { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
defineProps<{
  //DataModule übergeben
  dataModule: DataModule;
  dataFieldName: string;
}>();

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <h4 class="text-center m-2">{{ dataFieldName }}</h4>
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
