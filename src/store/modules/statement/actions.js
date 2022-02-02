export default {
  async loadTransfers(context) {
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;
    
    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/transfers/${userId}.json?auth=` +
        token
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }


    const transfers = [];

    for (const key in responseData) {
      const transfer = {
        id: key,
        amount: responseData[key].amount,
        bankName: responseData[key].bankName,
        date: responseData[key].date,
        fullName: responseData[key].fullName,
        narration: responseData[key].narration,
        recipientRoutingNumber: responseData[key].recipientRoutingNumber,
        status: responseData[key].status,
        transactionRef: responseData[key].transactionRef,
      };
      transfers.push(transfer);
    }
    context.commit("setTransferHistory", transfers);

    context.commit("setLoading", { status: false });
  },
  clearTransferHistory(context) {
    context.commit("clearTransferHistory");
  },
  setSubmitButton(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setSubmitButton", {
      ...returnedData,
    });
  },
};
