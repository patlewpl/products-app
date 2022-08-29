<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link class="logo__title" to="/">
          Products App <span> by patlew</span>
        </router-link>
      </div>
      <nav class="menu">
        <router-link v-if="!isLogged" class="menu__item login" to="/login">
          Login
        </router-link>
        <div v-else>
          <router-link class="menu__item products" to="/products">
            Products
          </router-link>
          <button class="menu__item logout" @click="logout">Logout</button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

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
};
</script>

<style lang="scss" scoped>
@import "../assets/css/header.scss";
</style>
