export default {
  async updateAccount(context, data) {
    const userId = context.rootGetters.userId;
    // const accountId = context.rootGetters.accountId;
    const accountData = {
      accountId: data.accountId,
      userEmail: data.userEmail,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      address: data.address,
      city: data.city,
      county: data.county,
      postalCode: data.postalCode,
      businessName: data.businessName,
      businessAddress: data.businessAddress,
      businessCity: data.businessCity,
      imageUrl: data.imageUrl,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/accounts/${userId}.json?auth=` +
        token,
      {
        method: "PUT",
        body: JSON.stringify(accountData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      // error ...
    }

    // const managementData = {
    //   accountBalance: data.accountBalance
    // }

    // context.dispatch("management/setHasUpdatedAccount", managementData, { root: true });
  },

  async loadAccount(context) {
    const token = context.rootGetters.token;
    const userId = context.rootGetters.userId;

    const response = await fetch(
      `https://condado-union-default-rtdb.firebaseio.com/accounts/${userId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to fetch!");
      throw error;
    }

    const hasUpdatedAccount = true;
    if (hasUpdatedAccount) {
      const accountData = {
        accountId: responseData.accountId,
        userEmail: responseData.userEmail,
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        dob: responseData.dob,
        address: responseData.address,
        city: responseData.city,
        county: responseData.county,
        postalCode: responseData.postalCode,
        businessName: responseData.businessName,
        businessAddress: responseData.businessAddress,
        businessCity: responseData.businessCity,
        imageUrl: responseData.imageUrl,
      };

      context.commit("setAccountData", accountData);
    }
  },
  setIsUpdating(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setUpdateStatus", {
      ...returnedData,
    });
  },
  setInputsStatus(context, data) {
    const returnedData = {
      status: data.status,
    };
    context.commit("setInputsStatus", {
      ...returnedData,
    });
  },

  // async loadCoaches(context) {
  //   const response = await fetch(
  //     `https://condado-union-default-rtdb.firebaseio.com/accounts.json`
  //   );
  //   const responseData = await response.json();

  //   if (!response.ok) {
  //     const error = new Error(responseData.message || "Failed to fetch!");
  //     throw error;
  //   }

  //   const coaches = [];

  //   for (const key in responseData) {
  //     const coach = {
  //       id: key,
  //       firstName: responseData[key].firstName,
  //       lastName: responseData[key].lastName,
  //       description: responseData[key].description,
  //       hourlyRate: responseData[key].hourlyRate,
  //       areas: responseData[key].areas,
  //     };
  //     coaches.push(coach);
  //   }

  //   context.commit("setCoaches", coaches);
  //   context.commit("setFetchTimestamp");
  // },
};
