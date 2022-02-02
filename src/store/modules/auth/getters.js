export default {
  userPin(state) {
    return state.userPin;
  },
  userId(state) {
    return state.userId;
  },
  accountId(state) {
    return state.accountId
  },
  token(state) {
    return state.token;
  },
  userEmail(state) {
    return state.userEmail
  },
  isAuthenticated(state) {
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};
