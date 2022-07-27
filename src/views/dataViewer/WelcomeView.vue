<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { Role } from "@/backend/Role";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";
import AggregatedDataView from "./AggregatedDataView.vue";

const CITY_ROLE = Role.City;
const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <div v-if="$dm.currentRole == CITY_ROLE" class="container text-center">
    <AggregatedDataView />
  </div>
  <div v-else class="container text-center">
    <h3>{{ $t("app.welcome.title") }}</h3>

    <nav class="flex-column lead">
      <p>
        {{ $t("app.welcome.getting_started") }}
      </p>
      <p>
        {{ $t("app.welcome.click_to_see_data") }}
      </p>
      <p>
        {{ $t("app.welcome.get_help") }}
      </p>
    </nav>
  </div>
</template>
