<template>
  <div class="product" :data-src="dataId">
    <div class="product__column--left">
      <img class="product__image" :src="productImage" :alt="productTitle" />
    </div>
    <div class="product__column--right">
      <div class="product__details">
        <p class="product__category">{{ productCategory }}</p>
        <h2 class="product__title">
          {{ productTitle }}
          <span class="product__price"> - {{ productPrice }}$</span>
        </h2>
        <p class="product__description">{{ productDescription }}</p>
      </div>
      <div class="product__actions">
        <base-button class="secondary">Edit</base-button>
        <base-button class="primary" @click="confirmAction('delete')"
          >Delete</base-button
        >
      </div>
    </div>
    <teleport to="body">
      <div
        v-if="isConfirmModalVisible"
        class="modal"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
        @click="closeModal"
      >
        <dialog open>
          <header>
            <h2>{{ actionMethod }}{{ productTitle }}?</h2>
          </header>
          <main>
            <base-button @click="action" class="primary">Confirm</base-button>
            <base-button @click="closeModal" class="secondary"
              >Close
            </base-button>
          </main>
        </dialog>
      </div>
    </teleport>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";

import BaseButton from "./ui/BaseButton.vue";

export default {
  components: { BaseButton },
  props: [
    "productTitle",
    "productDescription",
    "productPrice",
    "productCategory",
    "productImage",
    "dataId",
  ],
  setup(props: any) {
    const isConfirmModalVisible = ref(false);
    const actionMethod = ref("");
    const action: any = ref(null);

    function confirmAction(type: string) {
      isConfirmModalVisible.value = true;
      if (type === "delete") {
        actionMethod.value = "Delete ";
        action.value = deleteProduct;
      }
    }

    async function deleteProduct() {
      const url: string = `https://api.escuelajs.co/api/v1/products/${props.dataId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response) {
        location.reload();
      }
    }

    function closeModal() {
      isConfirmModalVisible.value = false;
    }

    return {
      confirmAction,
      isConfirmModalVisible,
      actionMethod,
      deleteProduct,
      action,
      closeModal,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/product.scss";

.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.4);

  & dialog {
    padding: 20px 40px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    box-shadow: 2px 2px 8px 8px $shadow;

    & header {
      margin-bottom: 20px;

      & h2 {
        font-size: 1.2rem;
      }
    }

    & main {
      & button {
        margin-right: 10px;
      }
    }
  }
}
</style>
