<template>
  <div class="product">
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
      <div class="product__actions">Edit</div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  props: [
    "productTitle",
    "productDescription",
    "productPrice",
    "productCategory",
    "productImage",
  ],
};
</script>
<style lang="scss" scoped>
@import "../assets/css/product.scss";
</style>
