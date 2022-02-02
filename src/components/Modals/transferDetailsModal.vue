<template>

   <div class="flex flex-wrap">
      <div class="w-full xl:w-6/12 xl:mb-0">
         <card-history
          :bankName="bankName"
          :date="date"
          :fullName="fullName"
          :amount="amount"
          :recipientRoutingNumber="recipientRoutingNumber"
          :narration="narration"
          :transactionRef="transactionRef"
          :status="status"
        ></card-history>
      </div>
     
    </div>
</template>

<script>
import CardHistory from "../Cards/CardHistory.vue";
export default {
  components: {
    CardHistory,
  },
  props: [
    "amount",
    "bankName",
    "narration",
    "date",
    "fullName",
    "recipientRoutingNumber",
    "status",
    "transactionRef",
  ],
  data() {
    return {
      showModal: true,
    };
  },
  methods: {
    toggleModal: function () {
      this.showModal = !this.showModal;
    },
  },
  created() {},
};
</script>