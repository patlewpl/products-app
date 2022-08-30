<template>
  <teleport to="body">
    <div
      class="modal"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      @click="closeModal"
    >
      <dialog open>
        <header>
          <h2>{{ actionTitle }}: {{ productTitle }} (id: {{ productId }}) ?</h2>
        </header>
        <main>
          <base-button @click="action" class="primary"> Confirm </base-button>
          <base-button @click="closeModal" class="secondary">
            Close
          </base-button>
        </main>
      </dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
export default {
  props: {
    actionTitle: {
      type: String,
      required: true,
    },
    productTitle: {
      type: String,
      required: false,
    },
    productId: {
      type: String,
      required: false,
    },
    action: {
      type: Function,
      required: true,
    },
  },

  emits: ["close"],

  methods: {
    closeModal() {
      (this as any).$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/_dialog.scss";
</style>
