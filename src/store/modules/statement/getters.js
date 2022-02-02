export default {
  transferHistory(state) {
    return state.transferHistory;
  },

  userPin(_, getters, _2, rootGetters) {
    return rootGetters.userPin;
  },

};
