
<template>
  <div
    :class="alertMode"
    class="text-white px-4 mr-4 py-4 mt-2 border-0 relative mb-4 shadow-lg"
  >
    <!-- <span class="text-l inline-block mr-4 align-middle">
      <i class="fas fa-exclamation-triangle"></i>
    </span> -->

    <span class="inline-block align-middle mr-4 text-sm">
      <b class="capitalize"></b> {{ alertMessage }}
    </span>

    <button
      class="
        bg-transparent
        text-s
        font-semibold
        leading-none
        right-0
        top-10
        align-middle
        mt-2
        mr-2
        outline-none
        focus:outline-none
      "
    >
      <span><i class="fa fa-times-circle"></i> </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "the-alert",
  props: ["alertMessage", "alertMode"],
  data() {
    return {};
  },
  methods: {
    closeAlert: function () {
      this.alertOpen = false;
    },
  },
  created() {},
};
</script>

<style scoped>
.with-warning {
  border-radius: 3px;
  background: linear-gradient(310deg, #141727e3 0%, #0d3858d6 100%);
}
.with-success {
  border-radius: 3px;
  background: linear-gradient(to right, #aaffa9, #11ffbd);
  color: #3d4b5ee7 !important;
}
</style>