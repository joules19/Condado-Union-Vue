import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      accountBalance: 0.0,
      ledgerBalance: 0.0,
      accountPerformance: 0,
      accountQuota: null,
      ledgerQuota: null,
      hasUpdatedAccount: false,
      hasSignatory: false,
      hasProfilePicture: false,
      hasCompletedAccount: false,
      accountEmail: "",
      loanStatus: "",
      userEmail: "",
    };
  },
  mutations,
  actions,
  getters,
};
