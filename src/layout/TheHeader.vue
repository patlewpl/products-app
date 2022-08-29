<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link class="logo__title" to="/">
          Products App <span> by patlew</span>
        </router-link>
      </div>
      <nav class="menu">
        <base-button
          v-if="!isLogged"
          link
          class="menu__item primary"
          to="/login"
          >Login
        </base-button>
        <div v-else>
          <base-button link class="menu__item primary" to="/products">
            Products
          </base-button>
          <base-button class="menu__item logout secondary" @click="logout">
            Logout
          </base-button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseButton from "../components/ui/BaseButton.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLogged = computed(() => {
      return store.getters.isAuthenticated;
    });
    function logout() {
      localStorage.removeItem("access_token");
      store.dispatch("logout");
      router.replace("/login");
    }
    return {
      isLogged,
      logout,
    };
  },
  components: { BaseButton },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/header.scss";
</style>
