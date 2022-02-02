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
              Recent Transactions
            </h3>
          </div>
          <div
            class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
          >
            <base-button
              mode="solid with-gradient dark-text"
              @click="toggleCardVisibility"
              >{{ message }}</base-button
            >
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
                  font-bold
                  whitespace-nowrap
                  p-4
                "
              >
                $ {{ parseFloat(transfer.amount).toFixed(2) }} USD
              </td>
              <td
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  font-semibold
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
                  font-semibold
                  whitespace-nowrap
                  p-4
                "
              >
                <i
                  :class="
                    transfer.status === 'successful'
                      ? 'fas fa-dot-circle text-emerald-500 mr-4'
                      : 'fas fa-dot-circle text-red-500 mr-4'
                  "
                ></i>
                {{ transfer.status }}
              </td>
              <td
                class="
                  border-t-0
                  px-6
                  align-middle
                  border-l-0 border-r-0
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  p-4
                "
              >
                <base-button
                  mode="solid sm-btn"
                  @click="transactionReference(transfer.transactionRef)"
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

    <transfer-details-modal
      v-show="isDetailsVisible"
      :amount="amount"
      :bankName="bankName"
      :narration="narration"
      :date="date"
      :fullName="fullName"
      :recipientRoutingNumber="recipientRoutingNumber"
      :status="status"
      :transactionRef="transactionRef"
    >
    </transfer-details-modal>
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
      message: "Hide",
      color: "emerald",
      selectedHistory: null,
      isDetailsVisible: false,
      amount: "",
      bankName: "",
      narration: "",
      date: "",
      fullName: "",
      recipientRoutingNumber: "",
      status: "",
      transactionRef: "",
    };
  },
  computed: {
    transferHistory() {
      return this.$store.getters["statement/transferHistory"];
    },
    loading() {
      return this.$store.getters["statement/isLoading"];
    },
  },
  methods: {
    toggleCardVisibility() {
      this.cardVisibilty = !this.cardVisibilty;
    },
    transactionReference(reference) {
      this.isDetailsVisible = true;
      this.selectedHistory = this.transferHistory.find(
        (history) => history.transactionRef === reference
      );
      this.amount = parseFloat(this.selectedHistory.amount).toFixed(2);
      this.bankName = this.selectedHistory.bankName;
      this.narration = this.selectedHistory.narration;
      this.date = this.selectedHistory.date;
      this.fullName = this.selectedHistory.fullName;
      this.recipientRoutingNumber = this.selectedHistory.recipientRoutingNumber;
      this.status = this.selectedHistory.status;
      this.transactionRef = this.selectedHistory.transactionRef;
      this.cardVisibilty = false;
    },
  },
  watch: {
    cardVisibilty(value) {
      if (value === false) {
        this.message = "Show";
      } else {
        this.message = "Hide";
        this.isDetailsVisible = false;
        if (this.isDetailsVisible === false) {
          this.amount = "";
          this.bankName = "";
          this.narration = "";
          this.date = "";
          this.fullName = "";
          this.recipientRoutingNumber = "";
          this.status = "";
          this.transactionRef = "";
        }
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