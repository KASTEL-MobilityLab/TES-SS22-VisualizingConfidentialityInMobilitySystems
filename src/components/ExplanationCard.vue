<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  content: string;
}>();
</script>

<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 v-if="subtitle" class="card-subtitle mb-2 text-muted">
        {{ subtitle }}
      </h6>
      <p class="card-text">
        {{ content }}
      </p>
    </div>
  </div>
</template>
