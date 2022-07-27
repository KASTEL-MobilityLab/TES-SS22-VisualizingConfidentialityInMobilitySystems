<script setup lang="ts">
import type { DataManager } from "@/backend/DataManager";
import { dataManagerKey } from "@/keys";
import { inject, type Ref } from "vue";

const $dm = inject(dataManagerKey) as Ref<DataManager>;
</script>

<template>
  <div class="container text-center">
    <h3>{{ $t("app.welcome.title") }}</h3>

    <nav class="flex-column lead">
      <p>
        {{ $t("app.aggregatedDataReasoning") }}
      </p>
      <p>
        {{ $dm.aggregatedData.averagePrice }}
      </p>
    </nav>
  </div>
</template>
