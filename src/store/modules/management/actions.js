export default {
  async setDefaultManagement(context) {
    const userId = context.rootGetters.userId;
    const userEmail = context.rootGetters.userEmail;

    // constId = context.rootGetters.accountId;
    const managementData = {
      accountBalance: 0,
      ledgerBalance: 0,
      accountPerformance: 1,
      hasUpdatedAccount: false,
      hasSignatory: false,
      hasProfilePicture: false,
      hasCompletedAccount: false,
      accountEmail: userEmail,
      loanStatus: "",
      accountQuota: 0.7,
      ledgerQuota: 0.7,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/management/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(managementData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }
  },
  async loadManagement(context) {
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/management/${userId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const managementData = {
      accountBalance: responseData.accountBalance,
      ledgerBalance: responseData.ledgerBalance,
      accountPerformance: responseData.accountPerformance,
      hasUpdatedAccount: responseData.hasUpdatedAccount,
      hasSignatory: responseData.hasSignatory,
      hasProfilePicture: responseData.hasProfilePicture,
      hasCompletedAccount: responseData.hasProfilePicture,
      accountEmail: responseData.accountEmail,
      loanStatus: responseData.loanStatus,
      accountQuota: responseData.accountQuota,
      ledgerQuota: responseData.ledgerQuota,
    };

    context.commit("setManagementData", managementData);
  },

  async setHasUpdatedAccount(context, data) {
    const userId = context.rootGetters.userId;
    const userEmail = context.rootGetters.userEmail;

    const managementData = {
      ...data,
      hasUpdatedAccount: true,
      accountEmail: userEmail,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/management/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(managementData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }
  },
  async setAccountBalance(context, data) {
    const userId = context.rootGetters.userId;
    const userEmail = context.rootGetters.userEmail;

    const managementData = {
      accountBalance: data.accountBalance,
      ledgerBalance: data.ledgerBalance,
      accountPerformance: data.accountPerformance,
      hasUpdatedAccount: data.hasUpdatedAccount,
      hasSignatory: data.hasSignatory,
      hasProfilePicture: data.hasProfilePicture,
      hasCompletedAccount: data.hasCompletedAccount,
      accountEmail: userEmail,
      accountQuota: data.accountQuota,
      ledgerQuota: data.ledgerQuota,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/management/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(managementData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }
    setTimeout(() => {
      context.dispatch("loadManagement");
    }, 3000);
  },
  async setLoanStatus(context, data) {
    const userId = context.rootGetters.userId;
    const userEmail = context.rootGetters.userEmail;

    const managementData = {
      ...data,
      loanStatus: "pending",
      accountEmail: userEmail,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/management/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(managementData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }
  },
};
