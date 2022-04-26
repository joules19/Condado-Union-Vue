export default {
  async registerLoan(context, data) {
    const userId = context.rootGetters.userId;
    const loanData = {
      duration: data.duration,
      monthlyRepayment: data.monthlyRepayment,
      totalRepayment: data.totalRepayment,
      loanAmount: data.loanAmount,
      purpose: data.purpose,
      date: data.date,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/loans/${userId}.json?auth=` +
        token,
      {
        method: "POST",
        body: JSON.stringify(loanData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    context.commit("registerLoan", {
      ...loanData,
      // id: userId,
    });
  },
  setIsApplicationDetails(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setIsApplicationDetails", {
      ...returnedData,
    });
  },
};
