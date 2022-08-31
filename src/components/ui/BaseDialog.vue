<template>
  <teleport to="body">
    <div class="modal" @wheel.prevent @touchmove.prevent @scroll.prevent>
      <dialog open>
        <header>
          <h2 v-if="mode === 'delete'">
            {{ $t("delete") }}: {{ productTitle }} ?
          </h2>
          <h2 v-else>{{ actionTitle }}</h2>
        </header>
        <main>
          <base-button @click="action" class="primary">
            {{ $t("confirm") }}
          </base-button>
          <base-button @click="closeModal" class="secondary">
            {{ $t("close") }}
          </base-button>
        </main>
      </dialog>
    </div>
  </teleport>
</template>

<script lang="ts">
export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
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
      default: "-",
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
