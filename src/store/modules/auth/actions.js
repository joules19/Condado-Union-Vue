let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },

  async signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },

  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjtKlWGywHW_oPJprzBYZ_OBobWRUDp1M";

    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjtKlWGywHW_oPJprzBYZ_OBobWRUDp1M";
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.pin,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    context.dispatch("setEmail", { userEmail: responseData.email });
    let accountId = null;

    const computedAccountId = function computeAccountId() {
      var str = responseData.localId;
      var matches = str.replace(/[^0-9]/g, "");
      accountId = "CU-"+matches;
    };

    computedAccountId();

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("userEmail", responseData.email);
    localStorage.setItem("accountId", accountId);
    localStorage.setItem("tokenExpiration", expirationDate);

    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      userEmail: responseData.email,
      accountId: accountId
      // tokenExpiration: expirationDate,
    });


    //set timeout when the user logs in then automatically logs them out when timeout clears
    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (mode === "signup") {
      context.dispatch('management/setDefaultManagement', {root:true})
    }
  },

  setEmail(context, payload) {
    context.commit("setEmail", payload);
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        // tokenExpiration: null,
      });
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("transactionRef");
    localStorage.removeItem("accountId");

    clearTimeout(timer);

    context.commit("setUser", {
      token: null,
      userId: null,
      // tokenExpiration: null,
    });
  },

  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
