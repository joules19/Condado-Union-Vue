export default {
  shouldComponentRerender(state) {
    return state.shouldComponentRerender;
  },
  transferData(state) {
    return state.transferData;
  },
  submitButtonClicked(state) {
    return state.submitButtonClicked;
  },
  // routingNumbers(state) {
  //   return state.routingNumbers;
  // },
  userPin(_, getters, _2, rootGetters) {
    return rootGetters.userPin;
  },
  transactionMode(state) {
    return state.transactionMode;
  },
  transferStatus(state) {
    return state.transferStatus;
  },
  invalidAccount(state) {
    return state.invalidAccount;
  },
  transactionLoading(state) {
    return state.transactionLoading;
  },
  isOtherBankTransferFormVisible(state) {
    return state.isOtherBankTransferFormVisible;
  },

};
