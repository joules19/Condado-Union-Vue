<template>
  <section>
    <div
      v-if="!loading"
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        bg-white
        w-full
        mb-6
        shadow-lg
        rounded
      "
    >
      <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-blueGray-700">
              Your Most Recent Transactions
            </h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
          >
            <button
              class="
                bg-indigo-500
                text-white
                active:bg-indigo-600
                text-xs
                font-bold
                uppercase
                px-3
                py-1
                rounded
                outline-none
                focus:outline-none
                mr-4
                mb-1
                ease-linear
                transition-all
                duration-150
              "
              type="button"
              @click="toggleCardVisibility"
            >
              {{ message }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="cardVisibilty" class="block w-full overflow-x-auto">
        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th
                class="
                  px-6
                  bg-blueGray-50
                  text-blueGray-500
                  align-middle
                  border border-solid border-blueGray-100
                  py-3
                  text-xs
                  uppercase
                  border-l-0 border-r-0
                  whitespace-nowrap
                  font-semibold
                  text-left
                "
              >
                Transaction Ref.
              </th>
              <th
                class="
                  px-6
                  bg-blueGray-50
                  text-blueGray-500
                  align-middle
                  border border-solid border-blueGray-100
                  py-3
                  text-xs
                  uppercase
                  border-l-0 border-r-0
                  whitespace-nowrap
                  font-semibold
                  text-left
                "
              >
                Transaction Amount
              </th>
              <th
                class="
                  px-6
                  bg-blueGray-50
                  text-blueGray-500
                  align-middle
                  border border-solid border-blueGray-100
                  py-3
                  text-xs
                  uppercase
                  border-l-0 border-r-0
                  whitespace-nowrap
                  font-semibold
                  text-left
                "
              >
                Description
              </th>
              <th
                class="
                  px-6
                  bg-blueGray-50
                  text-blueGray-500
                  align-middle
                  border border-solid border-blueGray-100
                  py-3
                  text-xs
                  uppercase
                  border-l-0 border-r-0
                  whitespace-nowrap
                  font-semibold
                  text-left
                "
              >
                Status
              </th>
              <th
                class="
                  px-6
                  bg-blueGray-50
                  text-blueGray-500
                  align-middle
                  border border-solid border-blueGray-100
                  py-3
                  text-xs
                  uppercase
                  border-l-0 border-r-0
                  whitespace-nowrap
                  font-semibold
                  text-left
                "
              >
                Action
              </th>
            </tr>
          </thead>

          <!-- LOOPING THROUGH USER TRANSFER HISTORY -->
          <tbody>
            <tr v-for="transfer in transferHistory" :key="transfer.id">
              <th
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  whitespace-nowrap
                  p-4
                  text-left
                "
              >
                {{ transfer.transactionRef }}
              </th>
              <td
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  whitespace-nowrap
                  p-4
                "
              >
                $ {{ transfer.amount }} USD
              </td>
              <td
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  whitespace-nowrap
                  p-4
                "
              >
                {{ transfer.narration }}
              </td>
              <td
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  whitespace-nowrap
                  p-4
                "
              >
                <i class="fas fa-dot-circle text-emerald-500 mr-4"></i>
                {{ transfer.status }}
              </td>
              <td>
                <base-button @click="transactionRef(transfer.transactionRef)"
                  >Details</base-button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <main v-if="loading">
      <base-spinner :loading="loading" :color="color"></base-spinner>
    </main>

    <transfer-details-modal v-show="isDetailsVisible" :narration="narration"></transfer-details-modal>
  </section>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import transferDetailsModal from "../Modals/transferDetailsModal.vue";
export default {
  components: { BaseButton, transferDetailsModal },
  data() {
    return {
      cardVisibilty: true,
      message: "Show",
      color: "emerald",
      selectedHistory: null,
      isDetailsVisible: false,
      narration: ""
    };
  },
  computed: {
    transferHistory() {
      return this.$store.getters["statement/transferHistory"];
    },
    loading() {
      return this.$store.getters["statement/isLoading"];
    },
    // transferDetailsLink() {
    //   return this.$route.path + '/' + this.id; // /statement/638******
    // },
    // narration() {
    //   return this.selectedHistory.narration;
    // }
  },
  methods: {
    toggleCardVisibility() {
      this.cardVisibilty = !this.cardVisibilty;
    },
    transactionRef(reference) {
      console.log(reference);
      this.isDetailsVisible = true;
      this.selectedHistory = this.transferHistory.find(
        (history) => history.transactionRef === reference
      );
      this.narration = this.selectedHistory.narration;
      console.log(this.selectedHistory, this.selectedHistory.narration);
    },
  },
  watch: {
    cardVisibilty(value) {
      if (value === false) {
        this.message = "Hide";
      } else {
        this.message = "Show";
      }
    },
  },
  mounted() {
    this.$store.dispatch("statement/loadTransfers");
  },
  unmounted() {
    this.$store.dispatch("statement/clearTransferHistory");
  },
};
</script>

<template>
  <div class="container mx-auto flex flex-wrap relative">
    <div class="flex flex-wrap -m-4">
      <div class="p-4 lg:w-2/2 md:w-full">
        <div
          class="
            relative
            flex
            border-2
            rounded-lg
            bg-white
            border-gray-200 border-opacity-50
            p-8
            sm:flex-row
            flex-col
          "
        >
          <div class="flex-grow">
            <h2 class="text-gray-900 text-lg title-font font-bold">
              {{narration}}
            </h2>
            <p class="text-blueGray-700 mb-2">{{ narration }}</p>
            <!-- <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["narration"],
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
  },
  computed: {
    // narration() {
    //   return this.selectedHistory.narration;
    // },
  },
  // created() {
  //   this.$store.dispatch("statement/loadTransfers");
  //   const transactionRef = localStorage.getItem("transactionRef");
  //   const transferHistory = this.$store.getters["statement/transferHistory"];

  //   if (transactionRef) {
  //     this.selectedHistory = transferHistory.find(
  //       (history) => history.transactionRef === transactionRef
  //     );

  //     console.log(transferHistory);
  //     console.log("local", this.selectedHistory);
  //   } else {
  //     this.selectedHistory = transferHistory.find(
  //       (history) => history.transactionRef === this.transactionRef
  //     );
  //   }
  // },
  // mounted() {
  //   localStorage.setItem("transactionRef", this.selectedHistory.transactionRef);
  // },
  // unmounted() {
  //   localStorage.removeItem("transactionRef");
  // },
};
</script>