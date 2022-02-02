<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="tailWindButton">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
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
    mode: {
      type: String,
      required: false,
      default: "solid",
    },
  },
  data() {
    return {
      // margin: {
      //   marginLeft: "10px",
      // },
      // nonMargin: {
      //   marginLeft: "0px",
      // },
    };
  },
  computed: {},
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.4rem 2rem;
  font: inherit;
  background-color: #12b982;
  border: 1px solid #12b982;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  display: inline-block;
  font-size: 16px;
}

.with-mt {
  margin: 0.5rem 0.5rem 0 0;
}

.with-gradient {
  background: linear-gradient(
    to right,
    #aaffa9,
    #11ffbd
  ) !important; /* Chrome 10-25, Safari 5.1-6 */
}

.dark-text {
  color: #3d4b5e !important;
}

.sm-btn {
  padding: 0.4rem 1rem;
  font-size: 12px;
}

.solid {
  background-color: #12b982;
  color: #fff;
  border: none;
}

.outline {
  background-color: transparent;
  color: #48c59b;
  border-color: #48c59b;
  margin-left: 6px;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #48c59bce;
  border-color: #48c59bce;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #48c59b29;
  color: white;
}
</style>