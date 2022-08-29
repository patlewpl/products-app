<template>
  <section class="product__list">
    <h1>Product List - {{ products.length }} products</h1>
    <base-button class="primary">Add product</base-button>
    <base-spinner v-if="isLoading"></base-spinner>
    <product-details
      v-if="!isLoading"
      v-for="product in allProducts"
      :key="product.id"
      :productTitle="product.title"
      :productDescription="product.description"
      :productPrice="product.price"
      :productCategory="product.category.name"
      :productImage="product.images[0]"
      :dataId="product.id"
    >
    </product-details>
    <ul class="pagination">
      <li class="page__item">
        <button
          type="button"
          class="page__link"
          v-for="pageNumber in pages"
          @click="page = pageNumber"
        >
          {{ pageNumber }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { ref, computed, watch, onMounted } from "vue";

import ProductDetails from "./ProductDetails.vue";
import BaseSpinner from "./ui/BaseSpinner.vue";
import BaseButton from "./ui/BaseButton.vue";

export default {
  components: { ProductDetails, BaseSpinner, BaseButton },

  setup() {
    const products: any = ref([]);
    const page: any = ref(1);
    const pages: any = ref([]);
    const productsPerPage: any = ref(10);
    const isLoading: any = ref(false);

    const allProducts = computed(() => {
      return paginate(products.value);
    });

    async function fetchProducts() {
      isLoading.value = true;
      const url: string = "https://api.escuelajs.co/api/v1/products";
      const response = await fetch(url);
      const responseData = await response.json();
      products.value = responseData;
      isLoading.value = false;
    }

    function setPages() {
      const numberOfPages: number = Math.ceil(
        products.value.length / productsPerPage.value
      );
      for (let index: number = 1; index <= numberOfPages; index++) {
        pages.value.push(index);
      }
    }

    function paginate(products: Array<String | Number>) {
      const paginatePage: number = page.value;
      const paginateProductsPerPage: number = productsPerPage.value;
      const from: number =
        paginatePage * paginateProductsPerPage - paginateProductsPerPage;
      const to: number = paginatePage * paginateProductsPerPage;
      window.scrollTo(0, 0);
      return products.slice(from, to);
    }

    watch(products, () => {
      setPages();
    });

    onMounted(() => {
      fetchProducts();
    });

    return {
      products,
      allProducts,
      pages,
      page,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/_productList.scss";
</style>
