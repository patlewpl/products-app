<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";

import TheHeader from "./layout/TheHeader.vue";

export default {
  components: { TheHeader },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("tryLogin");
    });
  },
};
</script>
