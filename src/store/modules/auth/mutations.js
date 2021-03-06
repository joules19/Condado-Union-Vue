export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.userEmail = payload.userEmail;
    state.accountId = payload.accountId;
    state.didAutoLogout = false;
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setEmail(state, payload) {
    state.userEmail = payload.userEmail;
  },
  setCredentialsAlert(state, payload) {
    state.errorResponse = payload.errorResponse;
    state.alertShow = payload.alertShow;
  },
  setAlertShow(state, payload) {
    state.alertShow = payload.status;
  },
};
