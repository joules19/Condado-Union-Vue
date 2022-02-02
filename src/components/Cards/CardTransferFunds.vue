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
        shadow-lg
        rounded-lg
        bg-blueGray-100
        border-0
      "
    >
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <h6 class="text-blueGray-700 text-xl font-bold">Transfer Funds</h6>
          <base-button
            mode="solid with-gradient dark-text"
            @click="showOtherBankTransferForm"
            >Other Banks</base-button
          >
        </div>
      </div>
      <div class="flex-auto px-2 lg:px-4 py-10 pt-0">
        <form @submit.prevent="submitForm">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Recipient's Information
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
                  :disabled="areInputsDisabled"
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
                />
                <p
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  v-if="amountValidity === 'invalid'"
                >
                  Amount field can't be empty or lesser than 1, please enter a
                  valid amount.
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
                  disabled="true"
                />
                <p class="text-blueGray-400" style="font-size: 13px">
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
                />
                <p
                  class="text-base font-light leading-relaxed mt-1 mb-4"
                  v-if="narrationValidity === 'invalid'"
                >
                  Narration field can't be empty, please enter a detailed.
                  narration.
                </p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap px-4">
            <p
              v-if="invalidAccount"
              class="
                text-base text-emerald
                font-normal
                leading-relaxed
                mt-1
                mb-4
                text-red-600
              "
            >
              Invalid Routing number, please check again.
            </p>
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
                  type="password"
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
                <div class="flex flex-wrap">
                  <base-button v-show="!loading" mode="solid with-mt">{{
                    message
                  }}</base-button>
                </div>

                <main v-show="loading">
                  <base-spinner :color="color"></base-spinner>
                </main>
                <p
                  v-show="transferStatus === 'failed'"
                  class="
                    text-base
                    font-normal
                    leading-relaxed
                    mt-1
                    mb-4
                    text-red-600
                  "
                >
                  Incorrect PIN. Please try again.
                </p>
              </div>
            </div>
          </div>
        </form>
        <the-right-popover
          :title="popoverTitle"
          :message="popoverMessage"
          :popoverShow="popoverShow"
        ></the-right-popover>
      </div>
    </div>
  </main>
</template>

<script>
import { createPopper } from "@popperjs/core";

export default {
  emits: ["save-data"],

  data() {
    return {
      recipientAccount: "",
      amount: null,
      bankName: "Condado Union",
      fullName: "",
      transferNarration: "",
      message: "Transfer",
      recipientAccountValidity: "pending",
      amountValidity: "pending",
      narrationValidity: "pending",
      loading: false,
      isAccountConfirmationLoading: false,
      pinInput: null,
      color: "#10b981",
      areInputsDisabled: false,
      popoverShow: false,
      popoverTitle: "Message",
      popoverMessage: "",
    };
  },
  computed: {
    userPin() {
      return this.$store.getters["userPin"];
    },
    // routingNumbers() {
    //   return this.$store.getters["transfer/routingNumbers"];
    // },
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

    isOtherBankVisible() {
      return this.$store.getters["transfer/isOtherBankTransferFormVisible"];
    },
  },
  methods: {
    generateTransactionRef() {
      return "623" + Math.floor(1000000 + Math.random() * 9000000);
    },
    date() {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date + " " + time;
    },
    async submitForm() {
      this.validateInput();
      const accountBalance = this.$store.getters["management/accountBalance"];
      const checkBalance = accountBalance - this.amount;
      if (this.inputsValidity) {
        if (checkBalance <= 0) {
          this.popoverMessage =
            "Sorry, you don't have enough funds. You now have access to overdrafts.";
          this.popoverShow = true;
          createPopper(this.$refs.btnRef, this.$refs.popoverRef, {
            placement: "right",
          });
          setTimeout(() => {
            this.popoverShow = false;
          }, 4000);
          return;
        }
        this.isAccountConfirmationLoading = true;
        this.loading = true;
      }
      const token = this.$store.getters["token"];
      const response = await fetch(
        `https://condado-union-default-rtdb.firebaseio.com/routingNumbers.json?auth=` +
          token
      );

      const responseData = await response.json();
      const result = responseData.find(
        (item) => item.routingNumber === this.recipientAccount
      );

      const transactionMode = this.$store.getters["transfer/transactionMode"];

      if (transactionMode === "transfer") {
        if (!result && this.inputsValidity) {
          this.$store.dispatch("transfer/setInvalidAccount", {
            status: true,
          });
          this.isAccountConfirmationLoading = false;
          this.loading = false;

          this.message = "Transfer";
        } else if (this.inputsValidity && result) {
          this.message = "Transfer";
          this.$store.dispatch("transfer/setInvalidAccount", {
            status: false,
          });
          this.fullName = result.accountName;
          this.$store.dispatch("transfer/setSubmitButton", { status: true });
          this.$store.dispatch("transfer/setTransactionMode", {
            status: "verify",
          });
          this.isAccountConfirmationLoading = false;
          this.loading = false;
          this.areInputsDisabled = true;

          this.message = "Verify";
        }
      } else if (transactionMode === "verify") {
        const result = this.userPin === this.pinInput;

        if (result) {
          this.$store.dispatch("transfer/setTransactionLoading", {
            status: true,
          });
          this.loading = true;

          this.$store.dispatch("transfer/setTransactionLoading", {
            status: false,
          });
          this.loading = false;

          this.$store.dispatch("transfer/setTransferStatus", {
            status: "pending",
          });

          const transferData = {
            routeNumber: this.recipientAccount,
            amount: this.amount,
            bank: this.bankName,
            fullName: this.fullName,
            narration: this.transferNarration,
            status: "successful",
            ref: this.generateTransactionRef(),
            date: this.date(),
          };

          this.recipientAccount = "";
          this.amount = null;
          this.fullName = "";
          this.transferNarration = "";
          this.pinInput = null;
          this.areInputsDisabled = false;

          this.$store.dispatch("transfer/setSubmitButton", { status: false });
          this.$store.dispatch("transfer/setTransactionMode", {
            status: "transfer",
          });
          this.message = "Transfer";

          this.$store.dispatch("transfer/setTransferStatus", {
            status: "successful",
          });
          this.popoverMessage = "Transaction Successful, you rock!";
          this.popoverShow = true;
          createPopper(this.$refs.btnRef, this.$refs.popoverRef, {
            placement: "top",
          });

          setTimeout(() => {
            this.$store.dispatch("transfer/setTransferStatus", {
              status: "pending",
            });
            this.popoverShow = false;
          }, 8000);

          this.$emit("save-data", transferData);
        } else {
          this.$store.dispatch("transfer/setTransferStatus", {
            status: "failed",
          });
          this.$store.dispatch("transfer/setTransactionLoading", {
            status: false,
          });
          this.loading = false;

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
      if (this.recipientAccount === "") {
        this.recipientAccountValidity = "invalid";
      } else {
        this.recipientAccountValidity = "valid";
      }
      if (this.amount === null || this.amount <= 0) {
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
    showOtherBankTransferForm() {
      this.$store.dispatch("transfer/setIsOtherBankTransferFormVisible", {
        status: true,
      });
    },
    // setPopoverShow(val) {
    //   if (val === true) {
    //     this.popoverShow = true;
    //     createPopper(this.$refs.btnRef, this.$refs.popoverRef, {
    //       placement: "right",
    //     });
    //   } else {
    //     this.popoverShow = false;
    //   }
    // },
  },
  watch: {
    recipientAccount(value) {
      this.accountNumber = value;
    },
  },
  created() {},

  unmounted() {
    this.$store.dispatch("transfer/setSubmitButton", {
      status: false,
    });
    this.$store.dispatch("transfer/setTransactionMode", { status: "Transfer" });
    this.message = "Transfer";
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