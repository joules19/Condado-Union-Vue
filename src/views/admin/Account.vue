<template>
  <div class="flex flex-wrap">
    <div class="w-full lg:w-3/12 px-4">
      <CardSettings v-show="image" />
    </div>
    <div class="w-full lg:w-8/12 px-4">
      <CardAccount
        @save-data="saveData"
        :alertShow="alertShow"
        :alertMessage="alertMessage"
        :alertMode="alertMode"
        @closeAlert="closeAlert"
      />
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
  data() {
    return {
      alertShow: false,
      alertMode: "",
      alertMessage: "",
    };
  },
  computed: {
    image() {
      return this.$store.getters["account/imageUrl"];
    },
    firstName() {
      return this.$store.getters["account/firstName"];
    },
    lastName() {
      return this.$store.getters["account/lastName"];
    },
    dob() {
      return this.$store.getters["account/dob"];
    },
    address() {
      return this.$store.getters["account/address"];
    },
    city() {
      return this.$store.getters["account/city"];
    },
    county() {
      return this.$store.getters["account/county"];
    },
    postalCode() {
      return this.$store.getters["account/postalCode"];
    },
    businessName() {
      return this.$store.getters["account/businessName"];
    },
    businessAddress() {
      return this.$store.getters["account/businessAddress"];
    },
    businessCity() {
      return this.$store.getters["account/businessCity"];
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
    saveData(accountData) {
      if (
        accountData.firstName === this.firstName &&
        accountData.lastName === this.lastName &&
        accountData.dob === this.dob &&
        accountData.address === this.address &&
        accountData.city === this.city &&
        accountData.county === this.county &&
        accountData.postalCode === this.postalCode &&
        accountData.businessName === this.businessName &&
        accountData.businessAddress === this.businessAddress &&
        accountData.businessCity === this.businessCity
      ) {
        this.alertHandler(
          "with-warning",
          "Hey, no new changes have been made yet!"
        );

        return;
      }

      this.$store.dispatch("account/setIsUpdating", {
        status: true,
      });
      const management = this.$store.getters["management/management"];

      const managementData = {
        ...management,
      };

      // const hasUpdatedAccount = this.$store.getters["management/hasUpdatedAccount"]

      this.$store.dispatch("account/updateAccount", accountData);
      this.$store.dispatch("management/setHasUpdatedAccount", managementData);

      // console.log(this.$store.getters["account/isUpdating"]);

      setTimeout(() => {
        this.$store.dispatch("account/setIsUpdating", { status: false });
        this.$store.dispatch("account/loadAccount");
        this.alertHandler("with-success", "Account updated successfully.");
      }, 4000);

      this.$store.dispatch("account/setInputsStatus", {
        status: true,
      });
    },
    closeAlert() {
      this.alertShow = false;
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
