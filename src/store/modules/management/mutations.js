export default {
  setManagementData(state, payload) {
    state.accountBalance = payload.accountBalance;
    state.ledgerBalance = payload.ledgerBalance;
    state.accountPerformance = payload.accountPerformance;
    state.hasUpdatedAccount = payload.hasUpdatedAccount;
    state.hasSignatory = payload.hasSignatory;
    state.hasProfilePicture = payload.hasProfilePicture;
    state.hasCompletedAccount = payload.hasCompletedAccount;
    state.accountEmail = payload.accountEmail;
    state.loanStatus = payload.loanStatus;
    state.accountQuota = payload.accountQuota;
    state.performanceQuota = payload.performanceQuota;
    state.ledgerQuota = payload.ledgerQuota;
  },
};
