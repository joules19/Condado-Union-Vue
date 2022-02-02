export default {
  async registerTransfer(context, data) {
    const userId = context.rootGetters.userId;
    const transferData = {
      recipientRoutingNumber: data.routeNumber,
      amount: data.amount,
      bankName: data.bank,
      fullName: data.fullName,
      narration: data.narration,
      status: data.status,
      transactionRef: data.ref,
      date: data.date,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/transfers/${userId}.json?auth=` +
        token,
      {
        method: "POST",
        body: JSON.stringify(transferData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerTransfer", {
      ...transferData,
      // id: userId,
    });
    context.commit("setTransactionLoading", { status: false });
  },
  setSubmitButton(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setSubmitButton", {
      ...returnedData,
    });
  },
  setTransactionMode(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setTransactionMode", {
      ...returnedData,
    });
  },
  setTransferStatus(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setTransferStatus", {
      ...returnedData,
    });
  },
  setInvalidAccount(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setInvalidAccount", {
      ...returnedData,
    });
  },
  setTransactionLoading(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setTransactionLoading", {
      ...returnedData,
    });
  },
  setIsOtherBankTransferFormVisible(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setIsOtherBankTransferFormVisible", {
      ...returnedData,
    });
  },
  setComponentRerender(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setComponentRerender", {
      ...returnedData,
    });
  },
};
