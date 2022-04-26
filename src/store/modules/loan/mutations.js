export default {
  registerLoan(state, payload) {
    state.loanData.push(payload);
  },
  setIsApplicationDetails(state, payload) {
    state.isApplicationDetailsVisible = payload.status;
  },
};
