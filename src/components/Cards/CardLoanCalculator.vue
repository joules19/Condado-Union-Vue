<template>
  <main>
    <div
      v-show="!isApplicationDetailsVisible"
      class="
        relative
        flex flex-col
        min-w-0
        break-words
        w-full
        lg:w-8/12
        mb-6
        shadow-lg
        rounded-lg
        bg-blueGray-100
        border-0
      "
    >
      <div id="info-background" class="w-full px-6 text-center py-6">
        <h2 id="white" class="text-2xl font-normal leading-normal mt-0 mb-2">
          Loan Calculator
        </h2>
        <p
          class="
            text-lg text-center
            font-normal
            leading-relaxed
            mt-4
            text-blueGray-500
          "
        >
          The amount on the loan calculator is an initial estimate only. We will
          make you a loan offer based on the information you share with us in
          your loan application.
        </p>
      </div>
      <div class="flex-auto mt-2 px-4 lg:px-10 py-10 pt-0">
        <transition name="alert">
          <div class="flex flex-wrap justify-end" v-show="alertShow">
            <the-alert
              @click="closeAlert"
              :alertMessage="alertMessage"
              :alertMode="alertMode"
            ></the-alert>
          </div>
        </transition>
        <form @submit.prevent="validateForm">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Loan Calculator
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  How much do you want to borrow?
                </label>
                <input
                  type="number"
                  class="
                    border-0
                    px-3
                    py-3
                    mb-4
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
                  v-model="amount"
                  placeholder="Enter amount"
                />
                <!-- <p
                  class="text-base text-red-500 font-light leading-relaxed mb-8"
                  v-if="!isFormValid"
                >
                  Please enter a valid routing number
                </p> -->
              </div>
            </div>

            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  For how long?
                </label>

                <div class="container">
                  <input
                    @change="process()"
                    v-model="value"
                    type="range"
                    class="mySlider"
                    min="3"
                    max="12"
                  />
                  <span :style="process()" class="rangeValue">
                    {{ value }}
                  </span>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  Purpose of the loan?
                </label>
                <select
                  @change="onSelect"
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
                  v-model="selectedPurpose"
                  required
                >
                  <option value="0">---Select---</option>
                  <option v-for="p in purpose" :value="p.name" :key="p.id">
                    {{ p.name }}
                  </option>
                </select>
              </div>
            </div>
            <div id="payment-label" class="w-full md:mt-6 lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    text-blueGray-400 text-xs text-center
                    font-bold
                    mb-2
                  "
                >
                  Your monthly repayment
                </label>

                <h1 id="add-size" class="text-xl font-normal text-center">
                  ${{ initialAmount.toLocaleString("en-US") || 0 }} USD
                </h1>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-8 justify-center">
            <transition name="fade-spinner">
              <base-spinner v-if="loading"></base-spinner>
            </transition>
            <base-button
              v-if="!loading"
              mode="solid with-gradient dark-text with-bmt"
              @click="submitLoanForm"
            >
              Apply &nbsp;<i
                class="fa fa-arrow-circle-right"
                aria-hidden="true"
              ></i>
            </base-button>
          </div>
          <p
            class="
              text-s text-left
              px-4
              text-center
              mt-10
              font-normal
              leading-relaxed
              text-blueGray-400
            "
          >
            Hey, we’ve selected the best loan duration for convenient
            repayments. Changing it will change the amount you can borrow. The
            maximum loan amount is at the bottom right of the box.
          </p>
        </form>
      </div>
    </div>

    <application-details-modal
      v-show="isApplicationDetailsVisible"
      :duration="duration"
      :monthlyRepayment="monthlyRepayment"
      :totalRepayment="totalRepayment"
      :loanAmount="amount"
      :purpose="selectedPurpose"
      @successAlert="successAlert"
    >
    </application-details-modal>

    <hr />
    <br /><br />
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
      <div class="w-full px-6 text-center py-6">
        <p
          class="
            text-lg text-left
            font-normal
            leading-relaxed
            text-blueGray-500
          "
        >
          <strong>Representative example:</strong> Loan amount of $13,000
          borrowed for 12 months. <strong>Monthly Interest Rate:</strong> 2.9%.
          <strong>Total Amount Payable:</strong> ₦2,683,430.
          <strong>APR:</strong> 34.17% No other fees.
          <strong>Minimum and Maximum Annual Percentage Rate (APR):</strong> 32%
          - 132.02%. <strong>Minimum and maximum loan tenure:</strong> 3 – 12
          months.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
// import countries from "../../countries.js";
import ApplicationDetailsModal from "../Modals/ApplicationDetailsModal.vue";

export default {
  components: { ApplicationDetailsModal },

  data() {
    return {
      value: 6,
      selectedPurpose: "",
      amount: 0,
      duration: 0,
      totalRepayment: 0,
      monthlyRepayment: 0,
      alertMode: "",
      alertMessage: "",
      alertShow: false,
      loading: false,
      purpose: [
        {
          id: "rent",
          name: "Rent",
        },
        {
          id: "car",
          name: "Car Purchase",
        },
        {
          id: "wedding",
          name: "Wedding",
        },
        {
          id: "medicals",
          name: "Medicals",
        },
        {
          id: "tution",
          name: "Tuition Fee",
        },
      ],
    };
  },
  computed: {
    initialAmount() {
      const desiredRange = this.value;
      const desiredAmount = parseInt(this.amount);

      let newAmount = null;

      if (this.value > 8) {
        let percent = (desiredAmount / 100) * 2.9;
        percent = percent * this.value;
        newAmount = desiredAmount + percent;
        newAmount;
      } else if (desiredRange <= 4) {
        let percent = (desiredAmount / 100) * 2.9;
        percent = percent * this.value;
        newAmount = desiredAmount + percent;

        newAmount;
      } else if (desiredRange <= 8) {
        let percent = (desiredAmount / 100) * 2.9;
        percent = percent * this.value;
        newAmount = desiredAmount + percent;
        newAmount;
      }

      newAmount = newAmount / this.value;

      return newAmount;
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
    process() {
      if (this.value > 8) {
        return {
          color: "#e74c3c",
          animation: "anim .3s ease-in 1 alternate",
        };
      }
    },
    submitLoanForm() {
      if (this.amount < 2500 || this.amount > 14500) {
        this.popoverShow = true;
        this.alertHandler(
          "with-warning",
          "Hey, to get the loan amount less than $2,200, kindly apply through our mobile app. Maximum amount for this account is $14,500."
        );
        return;
      }
      this.loading = true;
      const initialAmount = parseInt(this.initialAmount);
      this.totalRepayment = initialAmount * this.value;
      this.monthlyRepayment = initialAmount;
      this.duration = this.value;
      setTimeout(() => {
        this.loading = false;
        this.$store.dispatch("loan/setIsApplicationDetails", {
          status: true,
        });
      }, 2000);
    },
    successAlert() {
      this.$store.dispatch("management/loadManagement");
      this.selectedPurpose = "";
      this.amount = 0;
      this.alertHandler(
        "with-success",
        "Hello, your loan is being processed. A loan officer will get in touch with you soon."
      );
      this.$store.dispatch("management/loadManagement");
    },
    closeAlert() {
      this.alertShow = false;
    },
  },
  created() {
    setTimeout(() => {
      this.$store.dispatch("loan/setIsApplicationDetails", {
        status: false,
      });
    }, 2000);
  },
};
</script>


<style >
#add-size {
  margin-top: 20px;
  font-size: 2rem;
  font-weight: 500;
  color: #11ffbd;
}
#white {
  color: #fff;
}
#info-background {
  background: linear-gradient(
    to right,
    #aaffa9,
    #11ffbd
  ) !important; /* Chrome 10-25, Safari 5.1-6 */
  border-radius: 10px 10px 0 0;
}

body {
  margin: 0;
  padding: 0;
  background-color: #2f3640;
}

.container {
  position: relative;
  height: 45px;
  width: 420px;
}

.container .mySlider {
  position: absolute;
  left: 40%;
  top: 50%;
  transform: translate(-50%, -50%);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 80%;
  height: 10px;
  background-color: #02253d;
  border-radius: 20px;
  outline: none;
  opacity: 0.9;
  transition: opacity 0.2s ease-in;
  -webkit-transition: opacity 0.2s ease-in;
}
/*hover on range slider*/

.container .mySlider:hover {
  opacity: 1;
}
/* chrome and safari supporter */

.container .mySlider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: linear-gradient(to right, #aaffa9, #11ffbd) !important;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  border: 2px solid #d3d3d3;
}
/* mozila firefox supporter */

.container .mySlider::-moz-range-thumb {
  -moz-appearance: none;
  appearance: none;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #46ffb6;
  cursor: pointer;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  border: 2px solid #d3d3d3;
}
/* hover on slider thumb */

.container .mySlider::-webkit-slider-thumb:hover {
  box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.4);
}
/* Range Value Span */

.container .rangeValue {
  position: absolute;
  height: 40px;
  width: 60px;
  right: -30px;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #46ffb6;
  color: #ef4444;
  font-weight: 600;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-align: center;
  font-size: 24px;
  line-height: 38px;
}
/* Draw with ::before on span*/

.container .rangeValue::before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  background-color: #2f3640;
  top: 14px;
  left: -6px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid transparent;
  transform: rotate(45deg);
}

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

/*animation key frames*/

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

@keyframes anim {
  0% {
    right: -20px;
  }
  25% {
    right: -10px;
  }
  50% {
    right: -30px;
  }
  70% {
    right: -10px;
  }
  100% {
    right: -20px;
  }
}

@media only screen and (max-width: 830px) {
  #btn-width {
    width: 80%;
  }
  #payment-label {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 600px) {
  .container .mySlider {
    height: 10px;
    width: 80% !important;
    top: 30%;
  }

  .container .rangeValue {
    top: 30%;
    left: 90%;
  }
  /* 
  #btn-width {
    width: 100%;
  } */
  #payment-label {
    margin-top: 20px;
  }
}
</style>
