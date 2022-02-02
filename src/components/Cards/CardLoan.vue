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
        <h2 id="white" class="text-3xl font-normal leading-normal mt-0 mb-2">
          Get a convenient loan of up to $500,000 USD <br />
          from us today.
        </h2>
        <p class="text-lg font-normal leading-relaxed mt-4 text-emerald-800">
          Use the loan calculator to get started.
        </p>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form @submit.prevent="proceed">
          <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Loan Calculator
          </h6>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  What's your employment status?
                </label>
                <select
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
                  v-model="selectedStatus"
                >
                  <option value="0">---Select---</option>
                  <option
                    v-for="status in employmentStatus"
                    :value="status.id"
                    :key="status.id"
                  >
                    {{ status.status }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  What's your monthly income?
                </label>
                <input
                  type="number"
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
                  placeholder="Enter your monthly income"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  What state do you live in?
                </label>
                <select
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
                  v-model="selectedState"
                >
                  <option value="0">---Select---</option>
                  <option
                    v-for="state in states"
                    :value="state.abbrev"
                    :key="state.abbrev"
                  >
                    {{ state.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  Enter your area code?
                </label>
                <input
                  type="text"
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
                  placeholder="Area Code"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label class="block text-blueGray-600 text-s font-normal mb-2">
                  Tell us your date of birth
                </label>
                <input
                  type="date"
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
                />
              </div>
            </div>
          </div>
          <div class="flex flex-wrap mt-6 justify-center px-4">
            <base-button id="btn-width" mode="solid with-mt"
              >Continue &nbsp; <i class="fas fa-arrow-right"></i
            ></base-button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
// import countries from "../../countries.js";
export default {
  name: "card-loan",
  data() {
    return {
      selectedStatus: 0,
      monthlyIncome: "",
      selectedState: 0,
      areaCode: "",
      dob: "",
      employmentStatus: [
        {
          id: "employed",
          status: "Employed",
        },
        {
          id: "selfemployed",
          status: "Self-Employed",
        },
      ],
      states: [
        { name: "Alabama", abbrev: "AL" },
        { name: "Alaska", abbrev: "AK" },
        { name: "Arizona", abbrev: "AZ" },
        { name: "Arkansas", abbrev: "AR" },
        { name: "California", abbrev: "CA" },
        { name: "Colorado", abbrev: "CO" },
        { name: "Connecticut", abbrev: "CT" },
        { name: "Delaware", abbrev: "DE" },
        { name: "Florida", abbrev: "FL" },
        { name: "Georgia", abbrev: "GA" },
        { name: "Hawaii", abbrev: "HI" },
        { name: "Idaho", abbrev: "ID" },
        { name: "Illinois", abbrev: "IL" },
        { name: "Indiana", abbrev: "IN" },
        { name: "Iowa", abbrev: "IA" },
        { name: "Kansas", abbrev: "KS" },
        { name: "Kentucky", abbrev: "KY" },
        { name: "Louisiana", abbrev: "LA" },
        { name: "Maine", abbrev: "ME" },
        { name: "Maryland", abbrev: "MD" },
        { name: "Massachusetts", abbrev: "MA" },
        { name: "Michigan", abbrev: "MI" },
        { name: "Minnesota", abbrev: "MN" },
        { name: "Mississippi", abbrev: "MS" },
        { name: "Missouri", abbrev: "MO" },
        { name: "Montana", abbrev: "MT" },
        { name: "Nebraska", abbrev: "NE" },
        { name: "Nevada", abbrev: "NV" },
        { name: "New Hampshire", abbrev: "NH" },
        { name: "New Jersey", abbrev: "NJ" },
        { name: "New Mexico", abbrev: "NM" },
        { name: "New York", abbrev: "NY" },
        { name: "North Carolina", abbrev: "NC" },
        { name: "North Dakota", abbrev: "ND" },
        { name: "Ohio", abbrev: "OH" },
        { name: "Oklahoma", abbrev: "OK" },
        { name: "Oregon", abbrev: "OR" },
        { name: "Pennsylvania", abbrev: "PA" },
        { name: "Rhode Island", abbrev: "RI" },
        { name: "South Carolina", abbrev: "SC" },
        { name: "South Dakota", abbrev: "SD" },
        { name: "Tennessee", abbrev: "TN" },
        { name: "Texas", abbrev: "TX" },
        { name: "Utah", abbrev: "UT" },
        { name: "Vermont", abbrev: "VT" },
        { name: "Virginia", abbrev: "VA" },
        { name: "Washington", abbrev: "WA" },
        { name: "West Virginia", abbrev: "WV" },
        { name: "Wisconsin", abbrev: "WI" },
        { name: "Wyoming", abbrev: "WY" },
      ],
    };
  },
  methods: {
    proceed() {
      this.$router.push("/loan/loan-calculator");
      // const selectedStatus = this.selectedStatus;
      // const monthlyIncome = this.monthlyIncome;
      // const selectedState = this.selectedState;
      // const areaCode = this.areaCode;
      // const dob = this.dob;
    },
    // onChange() {
    //   console.log(this.selected);
    // },
    // onSelect() {
    //   console.log(this.selectedState);
    // },
  },
};
</script>


<style scoped>
#btn-width {
  width: 20%;
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
@media only screen and (max-width: 830px) {
  #btn-width {
    width: 80%;
  }

  @media only screen and (max-width: 600px) {
    #btn-width {
      width: 100%;
    }
  }
}
</style>