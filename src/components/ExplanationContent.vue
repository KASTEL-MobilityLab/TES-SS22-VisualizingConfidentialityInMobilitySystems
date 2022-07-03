<script setup lang="ts">
import type { Risk } from "@/backend/riskManager/Risk";

defineProps<{
  risk: Risk;
}>();
</script>

<template>
  <span>
    {{ risk.explanation }}
  </span>
</template>
