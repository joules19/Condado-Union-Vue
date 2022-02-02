import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      userData: {
        userId: "",
        firstName: "Mark",
        secondName: "Jefferson",
        pin: "2837",
      },
      transferData: [
        {}
      ],
      recipientAccount: "",
      amount: null,
      bankName: "Condado Union",
      fullName: "",
      transferNarration: "",
      message: "Transfer",
      shouldComponentRerender: "no",
      recipientAccountValidity: "pending",
      submitButtonClicked: false,
      routingNumbers: null,
      invalidAccount: false,
      transactionMode: "transfer",
      transferStatus: "pending",
      transactionLoading: false,
      isOtherBankTransferFormVisible: false
    };
  },
  mutations,
  actions,
  getters,
};
