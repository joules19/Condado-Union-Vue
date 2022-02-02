export default {
  registerTransfer(state, payload) {
    state.transferData.push(payload);
  },
  setSubmitButton(state, payload) {
    state.submitButtonClicked = payload.status;
  },
  setTransactionMode(state, payload) {
    state.transactionMode = payload.status
  },
  setTransferStatus(state, payload) {
    state.transferStatus = payload.status;
  },
  setInvalidAccount(state, payload) {
    state.invalidAccount = payload.status;
  },
  setTransactionLoading(state, payload) {
    state.transactionLoading = payload.status;
  },
  // setRouteNumbers(state, payload) {
  //   state.routingNumbers = payload;
  // },
  setIsOtherBankTransferFormVisible(state, payload) {
    state.isOtherBankTransferFormVisible = payload.status;
  },
  setComponentRerender(state, payload) {
    state.shouldComponentRerender = payload.status;
  },

};
