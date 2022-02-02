import { createWebHistory, createRouter } from "vue-router";

import Dashboard from "@/views/admin/Dashboard.vue";
import Account from "@/views/admin/Account.vue";
// import Settings from "@/views/admin/Settings.vue";
import Statement from "@/views/admin/Statement.vue";
// import Loan from "@/views/admin/Loan.vue";
// import Table from "@/components/Cards/CardTable.vue";
import CovidTracker from "@/views/admin/CovidTracker.vue";
import TransferFunds from "@/views/admin/TransferFunds.vue";
import transferDetailsModal from "@/components/Modals/transferDetailsModal.vue";
// import CardLoan from "@/components/Cards/CardLoan.vue";
import Calculator from "@/views/admin/Calculator.vue";
import store from "./store/index.js";

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Auth layout

import UserAuth from "@/views/auth/UserAuth.vue";
import Register from "@/views/auth/Register.vue";

// views without layouts

// import Landing from "@/views/Landing.vue";
// import Profile from "@/views/Profile.vue";
// import Index from "@/views/Index.vue";

// routes

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/auth/login",
      component: Admin,
      children: [
        {
          path: "/dashboard",
          component: Dashboard,
          name: "dashboard",
          meta: { requiresAuth: true },
        },
        {
          path: "/account",
          component: Account,
          name: "account",
          meta: { requiresAuth: true },
        },
        {
          path: "/statement",
          component: Statement,
          name: "statement",
          meta: { requiresAuth: true },
        },
        // {
        //   path: "/loan",
        //   component: Loan,
        //   name: "loan",
        //   meta: { requiresAuth: true },
        // },
        {
          path: "loan-calculator",
          component: Calculator,
          name: "loan-calculator",
        },

        {
          path: "/covid19",
          component: CovidTracker,
          name: "covid19",
          meta: { requiresAuth: true },
        },

        {
          path: "/transfer-funds",
          component: TransferFunds,
          name: "transfer",
          meta: { requiresAuth: true },
        },
        {
          path: "/statement/:transactionRef",
          component: transferDetailsModal,
          name: "transferDetails",
          props: true,
          meta: { requiresAuth: true },
        },
      ],
    },

    {
      path: "/auth",
      redirect: "/auth/login",
      component: Auth,
      children: [
        {
          path: "/auth/login",
          component: UserAuth,
          meta: { requiresUnauth: true },
        },
        {
          path: "/auth/register",
          component: Register,
        },
      ],
    },
    // {
    //   path: "/landing",
    //   component: Landing,
    // },
    // {
    //   path: "/profile",
    //   component: Profile,
    // },
    // {
    //   path: "/",
    //   component: Index,
    // },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
  mode: history,
});

router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth/login");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
