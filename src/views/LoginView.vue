<template>
  <base-spinner v-if="isLoading"></base-spinner>
  <section v-else class="login__form">
    <p class="error__message" v-if="!isFormValid">{{ $t("invalid_login") }}</p>
    <form @submit.prevent="signIn">
      <div class="form-control">
        <label for="email">{{ $t("email") }}</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <div class="form-control">
        <label for="password">{{ $t("password") }}</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
        />
      </div>
      <base-button class="primary">{{ $t("login") }}</base-button>
    </form>
  </section>
</template>

<script lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import BaseButton from "../components/ui/BaseButton.vue";

export default {
  components: { BaseSpinner, BaseButton },
  setup() {
    const store = useStore();
    const router = useRouter();
    const isFormValid = ref(true);
    const isLoading = ref(false);

    const formData = ref({
      email: "" as String,
      password: "" as String,
    });

    async function signIn() {
      isLoading.value = true;
      try {
        await store.dispatch("signIn", formData);
        isLoading.value = false;
        router.replace("/products");
      } catch (err: any) {
        isLoading.value = false;
        isFormValid.value = false;
        console.log(err.message);
      }
    }

    return {
      signIn,
      formData,
      isFormValid,
      isLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/_login.scss";
</style>
