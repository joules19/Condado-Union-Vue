<template>
  <main v-show="isOtherBankTransferFormVisible">
    <div
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        w-full
        mb-6
        shadow-lg
        rounded-lg
        bg-blueGray-100
        border-0
      "
    >
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">Other Banks</h6>
          <base-button
            @click="hideVisibility"
            mode="solid with-gradient dark-text"
            >Close</base-button
          >
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-4 py-10 pt-0">
        <form @submit.prevent="submitFor">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Recipient Information
          </h6>
          <div class="flex flex-wrap">
            <div
              class="form-control w-full lg:w-6/12 px-4"
              :class="{ invalid: recipientAccountValidity === 'invalid' }"
            >
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-600 text-s
                    font-normal
                    mb-2
                    required
                  "
                  for="recipient-account"
                >
                  Routing Number
                </label>
                <input
                  type="text"
                  id="recipient-account"
                  name="recipient-account"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  placeholder="Routing Number"
                  v-model.trim="recipientAccount"
                  disabled
                />
                <p
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  v-if="recipientAccountValidity === 'invalid'"
                >
                  Please enter a valid routing number
                </p>
              </div>
            </div>
            <div
              class="form-control w-full lg:w-6/12 px-4"
              :class="{ invalid: amountValidity === 'invalid' }"
            >
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-600 text-s
                    font-normal
                    mb-2
                    required
                  "
                  for="amount"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  placeholder="Enter Amount"
                  v-model.trim="amount"
                  disabled
                />
                <p
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  v-if="amountValidity === 'invalid'"
                >
                  Amount field can't be Empty, please enter a valid amount.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="form-control w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-600 text-s
                    font-normal
                    mb-2
                    required
                  "
                  for="bank-name"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bank-name"
                  name="bank-name"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-300
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  v-model="bankName"
                  disabled
                />
              </div>
            </div>
            <div class="form-control w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-blueGray-600 text-s font-normal mb-2"
                  for="full-name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="full-name"
                  name="full-name"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  v-model="fullName"
                  placeholder="Recipient Fullname"
                  disabled
                />
                <p style="font-size: 12px">
                  Recipient's fullname will be auto generated
                </p>
              </div>
            </div>
          </div>

          <!-- <hr class="mt-6 border-b-1 border-blueGray-300" /> -->

          <div class="flex flex-wrap">
            <div
              class="form-control w-full lg:w-6/12 px-4"
              :class="{ invalid: narrationValidity === 'invalid' }"
            >
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-600 text-s
                    font-normal
                    mb-2
                    required
                  "
                  for="narration"
                >
                  Narration
                </label>
                <input
                  type="text"
                  id="narration"
                  name="narration"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  v-model="transferNarration"
                  placeholder="Enter Naration"
                  disabled
                />
                <p
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  v-if="narrationValidity === 'invalid'"
                >
                  Narration field can't be Empty, please enter a detailed
                  narration.
                </p>
                <p
                  v-if="invalidAccount"
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  :class="{ invalid: narrationValidity === 'invalid' }"
                >
                  Invalid Routing number, please check again.
                </p>
              </div>
            </div>
          </div>
          <div v-if="submitButtonClicked" class="flex flex-wrap">
            <div class="form-control w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-600 text-s
                    font-normal
                    mb-2
                    required
                  "
                  for="pin"
                >
                  pin
                </label>
                <input
                  type="number"
                  id="pin"
                  name="pin"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  v-model="pinInput"
                  placeholder="Enter your secret 4-digits pin"
                />

                <!-- <p class="text-base font-light leading-relaxed mt-1 mb-4">
                Please check your mail for OTP.
              </p> -->
              </div>
            </div>
          </div>

          <div class="flex flex-wrap">
            <div class="w-full lg:w-12/12 px-4">
              <div class="relative w-full mt-2">
                <base-button v-show="!loading" mode="solid with-mt">{{
                  message
                }}</base-button>

                <main v-if="transactionLoading">
                  <base-spinner
                    :loading="transactionLoading"
                    :color="color"
                  ></base-spinner>
                </main>
                <p
                  class="
                    text-base
                    font-normal
                    leading-relaxed
                    mt-4
                    mb-4
                    text-blueGray-400
                  "
                >
                  Sorry, you can only make transfers to Condado accounts at this
                  time.<br />We noticed your IP has changed, please contact our
                  support for assistance.
                </p>
                <p
                  v-if="transferStatus === 'successful'"
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                >
                  Transaction Successful. You rock!
                </p>
                <p
                  v-if="transferStatus === 'failed'"
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                >
                  Incorrect Pin!
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  emits: ["save-data"],

  data() {
    return {
      recipientAccount: "",
      amount: null,
      bankName: "--Select Bank--",
      fullName: "",
      transferNarration: "",
      message: "Transfer",
      recipientAccountValidity: "pending",
      amountValidity: "pending",
      narrationValidity: "pending",
      pinInput: null,
      color: "#10b981",
    };
  },
  computed: {
    userPin() {
      return this.$store.getters["transfer/userPin"];
    },
    routingNumbers() {
      return this.$store.getters["transfer/routingNumbers"];
    },
    inputsValidity() {
      return (
        this.recipientAccountValidity === "valid" &&
        this.amountValidity === "valid" &&
        this.narrationValidity === "valid"
      );
    },
    submitButtonClicked() {
      return this.$store.getters["transfer/submitButtonClicked"];
    },
    transferStatus() {
      return this.$store.getters["transfer/transferStatus"];
    },
    invalidAccount() {
      return this.$store.getters["transfer/invalidAccount"];
    },
    transactionLoading() {
      return this.$store.getters["transfer/transactionLoading"];
    },
    generateTransactionRef() {
      return "623" + Math.floor(1000000 + Math.random() * 9000000);
    },
    isOtherBankTransferFormVisible() {
      return this.$store.getters["transfer/isOtherBankTransferFormVisible"];
    },
  },
  isOtherBankTransferFormVisible() {
    return this.$store.getters["transfer/isOtherBankTransferFormVisible"];
  },
  methods: {
    submitForm() {
      this.validateInput();
      const result = this.routingNumbers.find(
        (item) => item.routeNumber === this.recipientAccount
      );

      const transactionMode = this.$store.getters["transfer/transactionMode"];

      if (transactionMode === "transfer") {
        if (!this.recipientAccount === "" && !result) {
          this.$store.dispatch("transfer/setInvalidAccount", {
            status: true,
          });
        } else if (this.inputsValidity && result) {
          this.$store.dispatch("transfer/setInvalidAccount", {
            status: false,
          });
          this.fullName = result.accountName;
          this.$store.dispatch("transfer/setSubmitButtonTrue");
          this.message = "Verify";
          this.$store.dispatch("transfer/setTransactionModeToVerify");
        }
      } else if (transactionMode === "verify") {
        const result = this.userPin === this.pinInput;

        if (result) {
          this.$store.dispatch("transfer/setTransactionLoading", {
            status: "true",
          });

          this.$store.dispatch("transfer/setTransferStatus", {
            status: "successful",
          });

          this.$store.dispatch("transfer/setTransferStatus", {
            status: "pending",
          });

          const transferData = {
            routeNumber: this.recipientAccount,
            amount: this.amount,
            bank: this.bankName,
            fullName: this.fullName,
            narration: this.transferNarration,
            ref: this.generateTransactionRef,
          };

          this.$emit("save-data", transferData);
        } else {
          this.$store.dispatch("transfer/setTransferStatus", {
            status: "failed",
          });

          setTimeout(() => {
            this.$store.dispatch("transfer/setTransferStatus", {
              status: "pending",
            });
          }, 3000);
        }
      }
    },
    validateInput() {
      // const RegExpression = /^[a-zA-Z\s]*$/;
      if (
        this.recipientAccount === "" ||
        this.recipientAccount.length >= 11 ||
        this.recipientAccount.length < 1
      ) {
        this.recipientAccountValidity = "invalid";
      } else {
        this.recipientAccountValidity = "valid";
      }
      if (this.amount === null) {
        this.amountValidity = "invalid";
      } else {
        this.amountValidity = "valid";
      }
      if (this.transferNarration === "") {
        this.narrationValidity = "invalid";
      } else {
        this.narrationValidity = "valid";
      }
    },
    hideVisibility() {
      this.$store.dispatch("transfer/setIsOtherBankTransferFormVisible", {
        status: false,
      });
    },
  },
  watch: {
    recipientAccount(value) {
      this.accountNumber = value;
    },
  },
};
</script>

<style scoped>
.required:after {
  content: " *";
  color: red;
}

.form-control.invalid input {
  border-color: red;
}
.form-control.invalid label {
  color: red;
}
.form-control.invalid p {
  color: red;
}
</style>