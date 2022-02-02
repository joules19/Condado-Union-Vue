<template>
  <vue-button-spinner
    :isLoading="isLoading" 
    :disabled="isLoading"
    >
    <span><slot></slot></span>
</vue-button-spinner>
</template>

<script>
import VueButtonSpinner from 'vue-button-spinner';

export default {
  props: ["isLoading","disabled"],
  data() {
    return {
    };
  },
  components: {
    VueButtonSpinner
  }
};
</script>
