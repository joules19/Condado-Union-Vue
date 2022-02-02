<template>
  <moon-loader class="cen" :color="color" :size="size"></moon-loader>
</template>

<script>
import MoonLoader from "vue-spinner/src/MoonLoader.vue";

export default {
  props: ["loading", "color"],
  component: { MoonLoader },
  data() {
    return {
      size: "50px",
    };
  },
};
</script>

<style scoped>
.cen {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>