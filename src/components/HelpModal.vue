<script setup lang="ts">
import HelpContent from "./HelpContent.vue";
</script>

<template>
  <div id="helpModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title w-100">
            {{ $t("help.title") }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <HelpContent />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            {{ $t("app.close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
