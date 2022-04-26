export default {
  management(state) {
    return state;
  },
  accountBalance(state) {
    return state.accountBalance;
  },
  ledgerBalance(state) {
    return state.ledgerBalance;
  },
  accountPerformance(state) {
    return state.accountPerformance;
  },
  hasUpdatedAccount(state) {
    return state.hasUpdatedAccount;
  },
  hasProfilePicture(state) {
    return state.hasProfilePicture;
  },
  hasSignatory(state) {
    return state.hasSignatory;
  },
  hasCompletedAccount(state) {
    return state.hasCompletedAccount;
  },
  accountEmail(state) {
    return state.accountEmail;
  },
  loanStatus(state) {
    return state.loanStatus;
  },
  accountQuota(state) {
    return state.accountQuota;
  },
  ledgerQuota(state) {
    return state.ledgerQuota;
  },
  performanceQuota(state) {
    return state.performanceQuota;
  },
};
