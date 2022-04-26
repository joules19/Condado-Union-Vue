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
          <h1 class="text-blueGray-400 text-xl font-semibold">Loan Details</h1>
          <base-button mode="outline" @click="goBack">Go back</base-button>
        </div>
      </div>
      <div class="flex-auto px-6 w-full lg:w-12/12 py-10 mt-2 pt-0">
        <transition name="alert">
          <div class="flex flex-wrap justify-end" v-show="alertShow">
            <the-alert
              @click="close"
              :alertMessage="alertMessage"
              :alertMode="alertMode"
            ></the-alert>
          </div>
        </transition>
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
            <p class="text-blueGray-700 font-semibold mb-2">
              &nbsp; ${{ desiredLoanAmount }} USD
            </p>
          </div>

          <div class="flex flex-wrap lg:px-6 mt-4">
            <span
              class="
                text-s
                font-light
                inline-block
                align-right
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
              Duration
            </span>
            <p class="text-blueGray-700 text-s font-semibold mt-1">
              &nbsp; {{ duration }} Months
            </p>
          </div>

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
              Monthly Repayment
            </span>
            <p class="text-blueGray-700 font-semibold text-s mt-1">
              &nbsp; ${{ monthlyRepayment.toLocaleString("en-US") }} USD
            </p>
          </div>

          <div class="flex flex-wrap lg:px-6 mt-4">
            <span
              class="
                text-s
                font-light
                inline-block
                text-left
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
              Total Repayment
            </span>
            <p class="text-blueGray-700 font-semibold text-s mt-1">
              &nbsp; ${{ totalRepayment.toLocaleString("en-US") }} USD
            </p>
          </div>

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
              Loan Purpose
            </span>
            <p class="text-blueGray-700 font-semibold text-s mt-1">
              &nbsp; {{ purpose }}
            </p>
          </div>

          <div class="flex flex-wrap lg:px-6 mt-10">
            <div class="form-control w-full">
              <p class="text-blueGray-400 text-sm mb-2">
                Please enter your secret 4-digits pin to complete loan
                application.
              </p>
              <div
                class="relative w-full justify-center lg:w-8/12 mb-3"
                v-show="inputVisible"
              >
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
                    duration-
                  "
                  :disabled="disabledInput"
                  v-model="pinInput"
                  required
                  placeholder="Enter your secret 4-digits pin"
                />

                <!-- <p class="text-base font-light leading-relaxed mt-1 mb-4">
                Please check your mail for OTP.
              </p> -->
              </div>
            </div>
          </div>

          <div class="flex flex-wrap justify-center mt-4">
            <base-button
              v-show="!loading"
              mode="solid dark-text with-gradient with-mt"
              >{{ message }}&nbsp;
              <i class="fa fa-check-circle" aria-hidden="true"></i
            ></base-button>
            <transition name="fade-spinner">
              <base-spinner v-show="loading"></base-spinner>
            </transition>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
// import { createPopper } from "@popperjs/core";

export default {
  props: [
    "duration",
    "monthlyRepayment",
    "totalRepayment",
    "loanAmount",
    "purpose",
  ],
  emits: ["successData"],
  data() {
    return {
      showModal: true,
      message: "Proceed",
      loading: false,
      pinInput: "",
      alertMode: "",
      alertMessage: "",
      alertShow: false,
      inputVisible: true,
    };
  },
  computed: {
    desiredLoanAmount() {
      const amount = parseInt(this.loanAmount);
      return amount.toLocaleString("en-US");
    },
    computedLoanAmount() {
      return Math.floor(this.loanAmount);
    },
    userPin() {
      return this.$store.getters["userPin"];
    },
    desiredDuration() {
      return this.duration;
    },
    desiredPurpose() {
      return this.purpose;
    },
    computedMonthlyRepayment() {
      return this.monthlyRepayment;
    },
    computedTotalRepayment() {
      return this.totalRepayment;
    },
    loanStatus() {
      return this.$store.getters["management/loanStatus"];
    },
    isApplicationDetailsVisible() {
      return this.$store.getters["loan/isApplicationDetailsVisible"];
    },
  },
  methods: {
    alertHandler(alertMode, alertMessage) {
      this.alertShow = true;
      this.alertMode = alertMode;
      this.alertMessage = alertMessage;
      setTimeout(() => {
        this.alertShow = false;
      }, 10000);
    },

    goBack() {
      this.$store.dispatch("loan/setIsApplicationDetails", {
        status: false,
      });
      this.pinInput = "";
    },
    proceed() {
      const prevLoanStatus = this.loanStatus;
      if (prevLoanStatus === "pending") {
        this.alertHandler(
          "with-warning",
          "Hello, you still have a loan application under review. You can't have two facilities running alongside."
        );
        return;
      }
      if (this.pinInput === this.userPin) {
        const date = new Date();

        const data = {
          duration: this.desiredDuration,
          monthlyRepayment: this.computedMonthlyRepayment,
          totalRepayment: this.computedTotalRepayment,
          loanAmount: this.computedLoanAmount,
          purpose: this.desiredPurpose,
          date: date,
        };
        this.loading = true;
        this.$store.dispatch("loan/registerLoan", data);

        setTimeout(() => {
          const accountBalance =
            this.$store.getters["management/accountBalance"];
          const ledgerBalance = this.$store.getters["management/ledgerBalance"];
          const accountPerformance =
            this.$store.getters["management/accountPerformance"];
          const hasSignatory = this.$store.getters["management/hasSignatory"];
          const hasProfilePicture =
            this.$store.getters["management/hasProfilePicture"];
          const hasCompletedAccount =
            this.$store.getters["management/hasCompletedAccount"];
          const hasUpdatedAccount =
            this.$store.getters["management/hasUpdatedAccount"];

          const managementData = {
            hasUpdatedAccount: hasUpdatedAccount,
            accountBalance: accountBalance,
            ledgerBalance: ledgerBalance,
            accountPerformance: accountPerformance,
            hasSignatory: hasSignatory,
            hasProfilePicture: hasProfilePicture,
            hasCompletedAccount: hasCompletedAccount,
          };

          this.$store.dispatch("management/setLoanStatus", managementData);
          this.loading = false;

          this.loading = false;
          this.$store.dispatch("loan/setIsApplicationDetails", {
            status: false,
          });
          this.$emit("successAlert");

          this.pinInput = "";
        }, 5000);
      } else {
        this.alertHandler(
          "with-warning",
          "Incorrect pin, Please check credentials and try again."
        );
      }
    },
    close() {
      this.alertShow = false;
    },
  },
  mounted() {
    console.log(this.$store.getters["management/loanStatus"]);
  },
};
</script>

<style>
.alert-enter-active {
  animation: modal 0.3s ease-out;
}

.alert-leave-active {
  animation: modal 0.3s ease-in reverse;
}

.fade-spinner-enter-from,
.fade-spinner-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.fade-spinner-enter-to,
.fade-spinner-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.fade-spinner-enter-active {
  transition: all 0.4s ease-out;
}

.fade-spinner-leave-active {
  transition: all 0.4s ease-in;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
