export default {
  setAccountData(state, payload) {
    state.accountId = payload.accountId;
    state.userEmail = payload.userEmail;
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.dob = payload.dob;
    state.address = payload.address;
    state.city = payload.city;
    state.county = payload.county;
    state.postalCode = payload.postalCode;
    state.businessName = payload.businessName;
    state.businessAddress = payload.businessAddress;
    state.businessCity = payload.businessCity;
    state.imageUrl = payload.imageUrl;
  },
  setUpdateStatus(state, payload) {
    state.isUpdating = payload.status;
  },
  setInputsStatus(state, payload) {
    state.areInputsDisabled = payload.status;
  },
};
