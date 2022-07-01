<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  /**
   * How do we update the modal based on which button is clicked?
   * Bootstrap suggests using the `data-bs-*` attributes (like it is implemented now)
   * and update the modal with the event listener below
   * This is pretty ugly.
   *
   * One solution is to store the currently selected DataType as an property
   * in the data manager, so that instead of getting the clicked button attributes,
   * we could request the appropriate Risk Instance from the data manager.
   * But this is not ideal as well.
   */
  const explanationModal = document.getElementById(
    "explanationModal"
  ) as HTMLElement;
  explanationModal.addEventListener("show.bs.modal", function (event: Event) {
    // Button that triggered the modal
    const button = (event as MouseEvent).relatedTarget as HTMLButtonElement;
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute("data-bs-origin");

    // update the content of the modal
    const modalTitle = explanationModal.querySelector(".modal-title");
    const modalBody = explanationModal.querySelector(".modal-body");
    if (modalTitle && modalBody) {
      modalBody.textContent = recipient;
    }
  });
});
</script>

<template>
  <div id="explanationModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Explanation</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <span>
            <p class="value">Risk of Rider Identification</p>
          </span>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
