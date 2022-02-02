<template>
  <div class="flex flex-wrap">
     <div class="w-full lg:w-3/12 px-4">
      <CardSettings v-show="image"/>
    </div>
    <div class="w-full lg:w-8/12 px-4">
      <CardAccount @save-data="saveData" />
    </div>
   
  </div>
</template>
<script>
import CardSettings from "@/components/Cards/CardSettings.vue";
import CardAccount from "@/components/Cards/CardAccount.vue";

export default {
  components: {
    CardSettings,
    CardAccount,
  },
  computed: {
     image() {
      return this.$store.getters["account/imageUrl"]
    }
  },
  methods: {
    saveData(accountData) {
      const accountBalance = this.$store.getters["management/accountBalance"];
      const ledgerBalance = this.$store.getters["management/ledgerBalance"];
      const accountPerformance =
        this.$store.getters["management/accountPerformance"];
      const hasSignatory = this.$store.getters["management/hasSignatory"];
      const hasProfilePicture =
        this.$store.getters["management/hasProfilePicture"];
      const hasCompletedAccount =
        this.$store.getters["management/hasCompletedAccount"];

      const managementData = {
        accountBalance: accountBalance,
        ledgerBalance: ledgerBalance,
        accountPerformance: accountPerformance,
        hasSignatory: hasSignatory,
        hasProfilePicture: hasProfilePicture,
        hasCompletedAccount: hasCompletedAccount,
      };

      // const hasUpdatedAccount = this.$store.getters["management/hasUpdatedAccount"]

      this.$store.dispatch("account/updateAccount", accountData);
      this.$store.dispatch("management/setHasUpdatedAccount", managementData);

      // console.log(this.$store.getters["account/isUpdating"]);

      setTimeout(() => {
        this.$store.dispatch("account/setIsUpdating", { status: false });
        this.$store.dispatch("account/loadAccount");
      }, 4000);
    },
  },
  // async created() {
  //   await this.$store.dispatch("management/loadManagement");
  //   const hasUpdatedAccount =
  //     this.$store.getters["management/hasUppdatedAccount"];
  //   if (hasUpdatedAccount) {
  //     this.$store.dispatch("account/loadAccount");
  //   }
  // },
};
</script>
