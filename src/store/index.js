import { createStore } from "vuex";

import transferModule from "./modules/transfer/index.js";
import statementModule from "./modules/statement/index.js";
import authModule from "./modules/auth/index.js";
import accountModule from "./modules/account/index.js";
import managementModule from "./modules/management/index.js";
import loanModule from "./modules/loan/index.js";

const store = createStore({
  modules: {
    transfer: transferModule,
    statement: statementModule,
    auth: authModule,
    account: accountModule,
    management: managementModule,
    loan: loanModule,
  },
});

export default store;
