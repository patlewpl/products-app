<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";

import TheHeader from "./layout/TheHeader.vue";

export default {
  components: { TheHeader },
  setup() {
    const store = useStore();
    const i18n = useI18n();

    function setLanguage() {
      const lang = localStorage.getItem("lang") as any;
      if (!lang) {
        localStorage.setItem("lang", "EN");
      } else {
        i18n.locale.value = lang;
      }
    }

    onMounted(() => {
      setLanguage();
      store.dispatch("tryLogin");
    });
  },
};
</script>
