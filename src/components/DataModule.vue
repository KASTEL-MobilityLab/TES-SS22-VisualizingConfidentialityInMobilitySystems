<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
defineProps<{
  dataModule?: DataModule;
  dataFieldName: string;
}>();
const $dm = inject(dataManagerKey) as Ref<DataManager>;

function setCurrentRisk(key: string) {
  const datatype: string = key.split(".")[1];
  $dm.value.setCurrentRisk(datatype);
}

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
</script>

<template>
  <template v-if="dataModule !== undefined">
    <h4 class="text-center m-2">{{ $t(dataFieldName) }}</h4>
    <template v-for="(value, key) in dataModule?.displayedData" :key="key">
      <div class="row m-2 p-2">
        <div class="col m-2 fw-bold">
          <button
            type="button"
            :class="dataModule?.risks[key]"
            data-bs-toggle="modal"
            data-bs-target="#explanationModal"
            @click="setCurrentRisk(key)"
          >
            {{ $t(key) }}
          </button>
        </div>
        <div class="col m-2">
          {{ value }}
        </div>
      </div>
    </template>
  </template>

  <template v-else>
    <span class="lead">Please select a vehicle on the map first!</span>
  </template>
</template>
