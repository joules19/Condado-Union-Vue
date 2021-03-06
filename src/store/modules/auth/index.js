import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  // namespaced: true,
  state() {
    return {
      userId: null,
      accountId: null,
      userPin: "2837",
      token: null,
      userEmail: null,
      didAutoLogout: false,
      errorResponse: "",
      alertShow: false,
    };
  },
  mutations,
  actions,
  getters,
};
