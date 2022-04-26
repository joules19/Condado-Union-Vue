<template>
  <div class="flex flex-wrap">
    <div class="w-full text-center">
      <div
        ref="popoverRef"
        v-bind:class="{ hidden: !popoverShow, block: popoverShow }"
        class="
          with-gradient
          border-0
          mt-6
          shadow-lg
          mb-10
          block
          z-50
          font-normal
          leading-normal
          text-s
          max-w-xs
          text-left
          no-underline
          break-words
          rounded-lg
        "
      >
        <div>
          <div
            class="
              with-gradient
              text-bluegray-600
              font-semibold
              p-3
              mb-0
              border-b border-solid border-blueGray-100
              uppercase
              rounded-t-lg
            "
          >
            {{ title }}
          </div>
          <div class="text-blueGray-700 p-3">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "message", "popoverShow"],
  data() {
    return {};
  },
  computed: {
    popoverTitle() {
      return this.title.toUpperCase();
    },
    popoverMessage() {
      return this.message.toUpperCase();
    },
  },
};
</script>

<style scoped>
.with-gradient {
  opacity: 0.9;
  background: linear-gradient(
    to right,
    #aaffa9ad,
    #11ffbc95
  ) !important; /* Chrome 10-25, Safari 5.1-6 */
}
</style>