<template>
  <clip-loader class="mt-2" :color="color" :size="size"></clip-loader>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  props: ["loading", "color"],
  component: { ClipLoader },
  data() {
    return {
      size: "45px",
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