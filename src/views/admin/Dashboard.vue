<template>
  <div>
    <transition name="statement">
      <div class="flex flex-wrap">
        <div class="w-full xl:w-8/12 xl:mb-0 px-4">
          <card-account-statement />
        </div>
        <div class="w-full xl:w-4/12 px-4">
          <card-bar-chart />
        </div>
      </div>
    </transition>

    <!-- <div class="flex flex-wrap mt-4">
      <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <card-page-visits />
      </div>
      <div class="w-full xl:w-4/12 px-4">
        <card-social-traffic />
      </div>
    </div> -->
  </div>
</template>
<script>
// import CardLineChart from "@/components/Cards/CardLineChart.vue";
import CardBarChart from "@/components/Cards/CardBarChart.vue";
import CardAccountStatement from "@/components/Cards/CardAccountStatement.vue";
// import CardPageVisits from "@/components/Cards/CardPageVisits.vue";
// import CardSocialTraffic from "@/components/Cards/CardSocialTraffic.vue";
export default {
  name: "dashboard-page",
  components: {
    CardAccountStatement,
    CardBarChart,
    // CardPageVisits,
    // CardSocialTraffic,
  },
  created() {
    this.$store.dispatch("management/loadManagement");
    this.$store.dispatch("account/loadAccount");
  },
};
</script>


<style scoped>
.statement-enter-from {
}
.statement-enter-active {
  animation: modal 0.3s ease-out;
}
/* .statement-enter-to {
}

.statement-leave-from {
}
.statement-leave-active {
}
.statement-leave-to {
} */

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
