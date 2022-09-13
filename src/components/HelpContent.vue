<script setup lang="ts">
import { useI18n } from "vue-i18n";
import InfoCard from "./InfoCard.vue";

const { t } = useI18n();
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col d-flex align-items-stretch">
        <InfoCard
          :title="t('help.about_the_app')"
          :content="t('help.about_the_app_text')"
        />
      </div>
      <div class="col d-flex align-items-stretch">
        <InfoCard
          :title="t('help.how_it_works')"
          :content="t('help.how_it_works_text')"
        />
      </div>
      <div class="col d-flex align-items-stretch">
        <InfoCard
          :title="t('help.what_infos_you_can_get')"
          :content="t('help.what_infos_you_can_get_text')"
        />
      </div>
    </div>
  </div>
</template>
