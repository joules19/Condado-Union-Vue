<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {

    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/auth/login")
      }
    },
  },
};
</script>