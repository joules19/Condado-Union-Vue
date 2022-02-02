<template>
  <div
    class="
      relative
      flex
      border-2
      rounded-lg
      bg-white
      border-gray-200 border-opacity-50
      p-10
      mb-10
      mt-10
      sm:flex-row
      flex-col
    "
  >
    <div class="flex-grow">
      <h2 class="text-gray-900 text-md title-font font-bold">Date:</h2>
      <p class="text-blueGray-700 mb-2">{{ date }}</p>

      <h2 class="text-gray-900 text-md title-font font-bold">Bank Name:</h2>
      <p class="text-blueGray-700 mb-2">{{ bankName }}</p>
      <h2 class="text-gray-900 text-md title-font font-bold">
        Recipient's Fullname:
      </h2>
      <p class="text-blueGray-700 mb-2">{{ fullName }}</p>
      <h2 class="text-gray-900 text-md title-font font-bold">Amount:</h2>
      <p class="text-blueGray-700 mb-2"><strong>$</strong> {{ formattedAmount }} <strong>USD</strong></p>
      <br />
      <hr />
      <br />
      <h2 class="text-gray-900 text-md title-font font-bold">Narration:</h2>
      <p class="text-blueGray-700 mb-2">{{ narration }}</p>
      <h2 class="text-gray-900 text-md title-font font-bold">
        Routing Number:
      </h2>
      <p class="text-blueGray-700 mb-2">{{ recipientRoutingNumber }}</p>
      <h2 class="text-gray-900 text-md title-font font-bold">
        Transaction Reference:
      </h2>
      <p class="text-blueGray-700 mb-2">{{ transactionRef }}</p>
      <h2 class="text-gray-900 text-md title-font font-bold">Status:</h2>
      <p :style="switchStatusStyle" class="text-Red-100 mb-2">
        <strong>{{ status }}</strong>
      </p>

      <!-- <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a> -->
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "bankName",
    "date",
    "fullName",
    "amount",
    "narration",
    "recipientRoutingNumber",
    "transactionRef",
    "status",
  ],
  data() {
    return {};
  },
  computed: {
    switchStatusStyle() {
      if (this.status === "successful") {
        return "color: green;";
      } else {
        return "color: red;";
      }
    },
    formattedAmount() {
        return this.amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>