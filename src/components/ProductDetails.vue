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
        <base-button class="secondary" @click="activateEditModal('edit')">
          Edit
        </base-button>
        <base-button class="primary" @click="confirmAction('delete')">
          Delete
        </base-button>
      </div>
    </div>
  </div>
  <base-dialog
    mode="delete"
    v-if="isConfirmModalVisible"
    :productId="dataId.toString()"
    :productTitle="productTitle"
    :actionTitle="actionTitle"
    :action="action"
    @close="closeModal"
  ></base-dialog>
  <base-dialog
    mode="edit"
    v-if="isEditAvailable"
    :productId="dataId.toString()"
    :productTitle="productTitle"
    :actionTitle="actionTitle"
    :action="action"
    @close="closeModal"
  ></base-dialog>
</template>
<script lang="ts">
import { ref } from "vue";

export default {
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
    const isEditAvailable: any = ref(false);
    const actionTitle = ref("");
    const action: any = ref(null);
    function confirmAction(type: string) {
      isConfirmModalVisible.value = true;
      if (type === "delete") {
        actionTitle.value = "Delete";
        action.value = deleteProduct;
      }
    }
    function closeModal() {
      isConfirmModalVisible.value = false;
      isEditAvailable.value = false;
    }
    async function deleteProduct() {
      const token = localStorage.getItem("access_token");
      const url: string = `https://api.escuelajs.co/api/v1/products/${props.dataId}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Baerer ${token}`,
        },
      });
      if (response) {
        location.reload();
      }
    }

    function activateEditModal(type: string) {
      isEditAvailable.value = true;
      if (type === "edit") {
        actionTitle.value = "Update";
        action.value = editProduct;
      }
    }

    function editProduct() {
      console.log("updated");
    }

    return {
      activateEditModal,
      isConfirmModalVisible,
      isEditAvailable,
      confirmAction,
      deleteProduct,
      actionTitle,
      closeModal,
      action,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/product.scss";
</style>
