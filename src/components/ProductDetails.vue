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
        <base-button class="primary" @click="deleteProduct">Delete</base-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
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
    async function deleteProduct() {
      const url: string = `https://api.escuelajs.co/api/v1/products/${props.dataId}`;
      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response) {
        location.reload();
      } else {
      }
    }

    return {
      deleteProduct,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/css/product.scss";
</style>
