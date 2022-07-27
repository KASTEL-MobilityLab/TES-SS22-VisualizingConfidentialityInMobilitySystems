<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
  content: string;
  source?: string;
}>();
</script>
<template>
  <div class="card text-center rounded">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 v-show="subtitle" class="card-subtitle mb-2 text-muted">
        {{ subtitle }}
      </h6>
      <p class="card-text">
        {{ content }}
      </p>
    </div>
    <div v-show="source" class="card-footer text-muted">
      <a :href="source" class="link-secondary">{{ $t("app.source") }}</a>
    </div>
  </div>
</template>
