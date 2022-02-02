<template>
  <!-- Header -->
  <div class="relative bg-emerald-600 md:pt-32 pb-32 pt-12" id="header1">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats
              statSubtitle="Account Balance"
              :statTitle="accountBalance()"
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-money-check-alt"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats
              statSubtitle="Ledger Balance"
              :statTitle="ledgerBalance()"
              statArrow="down"
              statPercent="3.48"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-search-dollar"
              statIconColor="bg-orange-500"
            />
          </div>
          <!-- <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats
              statSubtitle="SALES"
              statTitle="924"
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Since yesterday"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div> -->
          <div class="w-full lg:w-6/12 xl:w-4/12 px-4">
            <card-stats
              amountValue="false"
              statSubtitle="ACCOUNT PERFORMANCE"
              :statTitle="accountPerformance()"
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  components: {
    CardStats,
  },
  methods: {
    accountBalance() {
      let accountBalance = this.$store.getters["management/accountBalance"];
      return `$ ${accountBalance.toLocaleString("en-US")} USD`;
    },
    ledgerBalance() {
      let ledgerBalance = this.$store.getters["management/ledgerBalance"];
      return `$ ${ledgerBalance.toLocaleString("en-US")} USD`;
    },
    accountPerformance() {
      let accountPerformance =
        this.$store.getters["management/accountPerformance"];
      return ` ${accountPerformance}`;
    },
  },
};
</script>

<style scoped>
#header1 {
  background: #02253dcc;
}
</style>
