import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  namespaced: true,
  state() {
    return {
      imageUrl: null,
      accountId: null,
      userEmail: "",
      firstName: "",
      lastName: "",
      dob: null,
      address: "",
      city: "",
      county: "",
      postalCode: "",
      businessName: "",
      businessAddress: "",
      businessCity: "",
      isUpdating: false
    };
  },
  mutations,
  actions,
  getters,
};
