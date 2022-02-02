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
            text-emerald-800
          "
        >
          The amount on the loan calculator is an initial estimate only. We will
          make you a loan offer based on the information you share with us in
          your loan application.
        </p>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
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
                  type="text"
                  class="
                    border-0
                    px-3
                    py-3
                    mb-6
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
                >
                  <option value="0">---Select---</option>
                  <option v-for="p in purpose" :value="p.id" :key="p.id">
                    {{ p.name }}
                  </option>
                </select>
              </div>
            </div>
            <div id="payment-label" class="w-full md:mt-6 lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block text-red-500 text-xs text-center font-bold mb-2"
                >
                  Your monthly repayment
                </label>
                <h1 id="add-size" class="text-xl font-normal text-center">
                  ${{ initialAmount }} USD
                </h1>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-8 px-4 justify-center">
            <base-button id="btn-width" mode="solid with-mt"
              >Apply
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
          <strong>Representative example:</strong> Loan amount of ₦2,000,000
          borrowed for 12 months. <strong>Monthly Interest Rate:</strong> 2.9%.
          <strong>Total Amount Payable:</strong> ₦2,683,430.
          <strong>APR:</strong> 34.17% No other fees.
          <strong>Minimum and Maximum Annual Percentage Rate (APR):</strong> 32%
          - 132.02%. <strong>Minimum and maximum loan tenure:</strong> 3 – 24
          months.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
// import countries from "../../countries.js";
export default {
  data() {
    return {
      value: 6,
      selectedPurpose: 0,
      amount: "500000",
      Duration: 0,
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
        const percent = (desiredAmount / 100) * 2.9;
        newAmount = desiredAmount + percent;
        newAmount;
      } else if (desiredRange <= 4) {
        const percent = (desiredAmount / 100) * 4.9;
        newAmount = desiredAmount + percent;
        newAmount;
      } else if (desiredRange <= 8) {
        const percent = (desiredAmount / 100) * 3.9;
        newAmount = desiredAmount + percent;
        newAmount;
      }

      newAmount = newAmount / this.value;

      return newAmount.toLocaleString("en-US");
    },
  },
  methods: {
    process() {
      if (this.value > 8) {
        return {
          color: "#e74c3c",
          animation: "anim .3s ease-in 1 alternate",
        };
      }
    },
  },
};
</script>


<style>
#btn-width {
  width: 20%;
}
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
  right: -20px;
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
/*animation key frames*/

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

  #btn-width {
    width: 100%;
  }
  #payment-label {
    margin-top: 20px;
  }
}
</style>
