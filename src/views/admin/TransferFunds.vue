
<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-8/12 px-2">
      <CardTransferFunds
        @save-data="saveData"
        @closeAlert="closeAlert"
        @inadequateFundAlert="inadequateFundAlert"
        @invalidPinAlert="invalidPinAlert"
        @incorrectRoutingNumberAlert="incorrectRoutingNumberAlert"
        :alertShow="alertShow"
        :alertMessage="alertMessage"
        :alertMode="alertMode"
      />

      <CardTransferForm />
    </div>
  </div>
</template>

<script>
// import emailjs from "emailjs-com";
import CardTransferForm from "@/components/Cards/CardTransferForm.vue";
import CardTransferFunds from "@/components/Cards/CardTransferFunds.vue";
// import AlertHandler from "../../AlertHandler";

export default {
  components: {
    CardTransferFunds,
    CardTransferForm,
  },
  data() {
    return {
      componentKey: 0,
      alertShow: false,
      alertMode: "",
      alertMessage: "",
    };
  },
  computed: {
    shouldComponentRerender() {
      return this.$store.getters["transfer/shouldComponentRerender"];
    },
    management() {
      return this.$store.getters["management/management"];
    },
  },
  methods: {
    alertHandler(alertMode, alertMessage) {
      this.alertShow = true;
      this.alertMode = alertMode;
      this.alertMessage = alertMessage;
      setTimeout(() => {
        this.alertShow = false;
      }, 7000);
    },
    saveData(data) {
      let newAccountBalance = null;

      const presentAccountBalance =
        this.$store.getters["management/accountBalance"];
      const transferAmount = data.amount;

      newAccountBalance = presentAccountBalance - transferAmount;

      const newAccountQuota =
        this.$store.getters["management/accountQuota"] + 0.037;
      const newLedgerQuota =
        this.$store.getters["management/ledgerQuota"] + 0.023;
      let newAccountPerformance =
        this.$store.getters["management/accountPerformance"];
      newAccountPerformance = Math.floor(newAccountPerformance) + 0.21;
      const managementData = {
        ...this.management,
        accountBalance: newAccountBalance,
        ledgerBalance: newAccountBalance,
        accountQuota: newAccountQuota,
        ledgerQuota: newLedgerQuota,
        accountPerformance: newAccountPerformance,
      };

      this.$store.dispatch("transfer/registerTransfer", data);

      this.$store.dispatch("transfer/setTransactionLoading", {
        status: "false",
      });
      this.alertHandler("with-success", "Transaction Successful, you rock!");
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
    closeAlert() {
      this.alertShow = false;
    },
    inadequateFundAlert() {
      this.alertHandler(
        "with-warning",
        "Sorry, you don't have enough funds. You now have access to overdrafts."
      );
    },
    invalidPinAlert() {
      this.alertHandler(
        "with-warning",
        "Incorrect Pin, please check credentials and try again."
      );
    },
    incorrectRoutingNumberAlert() {
      this.alertHandler(
        "with-warning",
        "Invalid routing number, please confirm details and try again."
      );
    },
  },
  watch: {},
};
</script>