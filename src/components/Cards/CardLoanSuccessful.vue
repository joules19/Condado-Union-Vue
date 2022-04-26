<template>
  <main>
    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        w-full
        mb-6
        lg:w-6/12
        mt-6
        shadow-lg
        rounded-lg
        bg-blueGray-100
        border-0
      "
    >
      <div class="rounded-t bg-white mb-2 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-semibold">Loan Details</h6>
          <base-button mode="solid with-gradient dark-text" @click="goBack"
            >OK</base-button
          >
        </div>
      </div>
      <div class="flex-auto px-6 w-full lg:w-12/12 py-10 mt-4 pt-0">
        <form @submit.prevent="proceed">
          <div class="flex flex-wrap lg:px-6 mt-4">
            <span
              class="
                text-s
                font-light
                inline-block
                py-1
                px-6
                rounded-full
                text-blueGray-600
                bg-emerald-200
                mr-4
                last:mr-0
                mr-1
              "
            >
              Loan Amount
            </span>
            <p class="text-blueGray-700 font-semibold mb-2">&nbsp; hello USD</p>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>