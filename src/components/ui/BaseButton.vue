<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/shared.scss";

button,
a {
  padding: 10px 20px;
  display: inline-block;
  background-color: $primary;
  color: $title-inverse;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: $hover;
  }

  &.primary {
    background-color: $primary;

    &:hover,
    &:active {
      background-color: $hover;
    }
  }

  &.secondary {
    background-color: $secondary;

    &:hover,
    &:active {
      background-color: $hover;
    }
  }
}
</style>
