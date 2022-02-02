
<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-6/12 px-4">
      <CardTransferFunds @save-data="saveData" />
    </div>
    <div class="w-full lg:w-6/12 px-4">
      <CardTransferForm />
    </div>
  </div>
</template>

<script>
// import emailjs from "emailjs-com";
import CardTransferForm from "@/components/Cards/CardTransferForm.vue";
import CardTransferFunds from "@/components/Cards/CardTransferFunds.vue";

export default {
  components: {
    CardTransferFunds,
    CardTransferForm,
  },
  data() {
    return {
      componentKey: 0,
    };
  },
  computed: {
    shouldComponentRerender() {
      return this.$store.getters["transfer/shouldComponentRerender"];
    },
  },
  methods: {
    saveData(data) {
      let newAccountBalance = null;

      const presentAccountBalance =
        this.$store.getters["management/accountBalance"];
      const transferAmount = data.amount;

      newAccountBalance = presentAccountBalance - transferAmount;

      const managementData = {
        accountBalance: newAccountBalance,
        ledgerBalance: newAccountBalance,
        accountPerformance:
          this.$store.getters["management/accountPerformance"],
        hasUpdatedAccount: this.$store.getters["management/hasUpdatedAccount"],
        hasSignatory: this.$store.getters["management/hasSignatory"],
        hasProfilePicture: this.$store.getters["management/hasProfilePicture"],
        hasCompletedAccount:
          this.$store.getters["management/hasCompletedAccount"],
      };

      this.$store.dispatch("transfer/registerTransfer", data);
      this.$store.dispatch("transfer/setTransactionLoading", {
        status: "false",
      });
      this.$store.dispatch("management/setAccountBalance", managementData);
      // sendEmail();
    },
    // sendEmail(e) {
    //   try {
    //     emailjs.sendForm(
    //       "service_twar9s9",
    //       "template_g86j6ne",
    //       e.target,
    //       "joules19",
    //       {
    //         name: "ayodele",
    //         email: "babafemiayodele1@gmail.com",
    //         message: "successful testing",
    //       }
    //     );
    //   } catch (error) {
    //     console.log({ error });
    //   }
    //   // Reset form field
    //   // this.name = "";
    //   // this.email = "";
    //   // this.message = "";
    // },
  },
  watch: {},
};
</script>