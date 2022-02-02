export default {
  setTransferHistory(state, payload) {
    state.transferHistory.push(...payload);
  },
  clearTransferHistory(state) {
    state.transferHistory = [];
  },
  setLoading(state, payload) {
    state.loading = payload.status;
  },
};
