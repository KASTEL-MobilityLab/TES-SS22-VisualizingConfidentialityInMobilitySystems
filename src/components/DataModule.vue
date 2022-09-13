<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import type { DataModule } from "@/backend/dataModules/DataModule";
import { dataManagerKey } from "@/keys";
import type { DataTypeKey } from "@/utils/translationUtils";
import { inject, type Ref } from "vue";
defineProps<{
  dataModule?: DataModule;
  dataFieldName: string;
}>();
const $dm = inject(dataManagerKey) as Ref<DataManager>;

function setCurrentRisk(key: DataTypeKey) {
  const datatype: string = $dm.value.getDataType(key);
  $dm.value.setCurrentRisk(datatype);
}

// This component takes an instance of DataField and displays all its attributes
// in the Data Viewer.
</script>

<template>
  <template v-if="dataModule !== undefined">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <button class="btn btn-light btn-md" @click="$router.back()">
          <i class="fa-solid fa-arrow-left fa-2x"></i>
        </button>
      </div>
      <div class="fs-3 p-2 mb-1">{{ $t(dataFieldName) }}</div>
    </div>
    <template v-for="(value, key) in dataModule?.displayedData" :key="key">
      <div class="d-flex align-items-center row m-2 p-2">
        <div class="col m-2 fw-bold">
          <div class="list-group">
            <li
              :class="dataModule?.risks[key]"
              data-bs-toggle="modal"
              data-bs-target="#explanationModal"
              @click="setCurrentRisk(key as DataTypeKey)"
            >
              {{ $t(key) }}
            </li>
          </div>
        </div>
        <div v-if="$dm.getRoleVisibility(key as DataTypeKey)" class="col m-2">
          {{ value }}
        </div>
        <div v-else id="blur" class="col m-2">Censored</div>
      </div>
    </template>
  </template>

  <template v-else>
    <span class="lead">Please select a vehicle on the map first!</span>
  </template>
</template>

<style>
#blur {
  font-size: 20px;
  color: transparent;
  text-shadow: 0 0 10px #000;
}
</style>
