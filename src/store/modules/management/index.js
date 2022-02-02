import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      accountBalance: 0.00,
      ledgerBalance: 0.00,
      accountPerformance: "2%",
      hasUpdatedAccount: false,
      hasSignatory: false,
      hasProfilePicture: false,
      hasCompletedAccount: false,
      accountEmail: ""
    };
  },
  mutations,
  actions,
  getters,
};
