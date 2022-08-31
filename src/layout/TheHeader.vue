<template>
  <header>
    <div class="container">
      <div class="logo">
        <router-link class="logo__title" to="/">
          Products App <span> by patlew</span>
        </router-link>
      </div>
      <nav class="menu">
        <div class="lang">
          <select
            class="lang__select"
            v-model="$i18n.locale"
            @change="choosenLanguage($i18n.locale)"
          >
            <option
              v-for="locale in $i18n.availableLocales"
              :key="`locale-${locale}`"
              :value="locale"
            >
              {{ locale }}
            </option>
          </select>
        </div>
        <base-button
          v-if="!isLogged"
          link
          class="menu__item primary"
          to="/login"
          >{{ $t("login") }}
        </base-button>
        <div v-else>
          <base-button link class="menu__item primary" to="/products">
            {{ $t("products") }}
          </base-button>
          <base-button class="menu__item logout secondary" @click="logout">
            {{ $t("logout") }}
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
    function choosenLanguage(lang: string) {
      localStorage.setItem("lang", lang);
    }
    return {
      choosenLanguage,
      isLogged,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/header.scss";
</style>
