<template>
  <teleport to="body">
    <div class="modal" @wheel.prevent @touchmove.prevent @scroll.prevent>
      <dialog open>
        <header>
          <h2 v-if="mode === 'edit'">
            {{ $t("update") }} {{ productTitle }} (id: {{ productId }})
          </h2>
          <h2 v-else-if="mode === 'add'">
            {{ $t("add_product") }}
          </h2>
        </header>
        <main>
          <form @submit.prevent="fetchActionProductConfirm">
            <div class="add__form">
              <div class="form-control">
                <label for="title">{{ $t("product_name") }}</label>
                <input
                  type="text"
                  id="title"
                  minlength="3"
                  maxlength="64"
                  v-model="formData.title"
                  required
                />
              </div>
              <div class="form-control">
                <label for="price">{{ $t("product_price") }} </label>
                <input
                  type="number"
                  id="price"
                  min="0.01"
                  step="0.01"
                  v-model="formData.price"
                  required
                />
              </div>
              <div class="form-control">
                <label for="description"
                  >{{ $t("product_description") }}
                </label>
                <input
                  type="text"
                  id="description"
                  minlength="32"
                  maxlength="128"
                  v-model="formData.description"
                  required
                />
              </div>
              <div class="form-control">
                <label for="category">{{ $t("product_category") }} </label>
                <select
                  name="category"
                  id="category"
                  v-model="formData.category"
                  required
                >
                  <option
                    v-for="category in categories[0]"
                    :key="category"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div class="form-control">
                <label for="url">{{ $t("product_image") }} </label>
                <select name="url" id="url" v-model="formData.url" required>
                  <option value="https://placeimg.com/640/480/any">
                    https://placeimg.com/640/480/any
                  </option>
                  <option
                    value="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  >
                    https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png
                  </option>
                </select>
              </div>
            </div>
            <base-button class="primary"> {{ $t("add") }} </base-button>
            <base-button @click="closeModal" class="secondary">
              {{ $t("close") }}
            </base-button>
          </form>
        </main>
      </dialog>
    </div>
  </teleport>
  <base-dialog
    v-if="isConfirmModalVisible"
    actionTitle="Confirm"
    :action="fetchActionProduct"
    :productTitle="formData.title"
    @close="toggleConfirmActionModal"
  ></base-dialog>
</template>

<script lang="ts">
export default {
  props: {
    mode: {
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
  },

  emits: ["close"],

  data() {
    return {
      formData: {
        title: "" as String,
        price: "" as String | Number,
        description: "" as String,
        category: "" as String | Number,
        url: "" as String,
      },
      categories: [],
      isConfirmModalVisible: false as Boolean,
    };
  },

  computed: {
    // modalTitle() {
    //   return
    // },

    fetchMethod() {
      return (this as any).mode === "edit" ? "PUT" : "POST";
    },
  },

  methods: {
    async fetchActionProduct() {
      const token = localStorage.getItem("access_token");
      let url: string = "https://api.escuelajs.co/api/v1/products/";

      if ((this as any).mode === "edit") {
        url = `https://api.escuelajs.co/api/v1/products/${
          (this as any).productId
        }`;
      }

      const response = await fetch(url, {
        method: (this as any).fetchMethod,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: (this as any).formData.title,
          price: (this as any).formData.price,
          description: (this as any).formData.description,
          categoryId: (this as any).formData.category,
          images: [(this as any).formData.url],
        }),
      });
      if (!response.ok) {
        console.log("Action product failed");
      }
      location.reload();
    },

    async getCategories() {
      const url = "https://api.escuelajs.co/api/v1/categories?limit=5";
      const response = await fetch(url);

      if (!response.ok) {
        console.log("Get category failed");
      }

      const responseData = await response.json();
      (this as any).categories.push(responseData);
    },

    closeModal() {
      (this as any).$emit("close");
    },

    fetchActionProductConfirm() {
      this.toggleConfirmActionModal();
    },

    toggleConfirmActionModal() {
      (this as any).isConfirmModalVisible = !(this as any)
        .isConfirmModalVisible;
    },
  },

  created() {
    (this as any).getCategories();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/_dialog.scss";
</style>
