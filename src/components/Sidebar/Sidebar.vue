<template>
  <nav
    class="
      md:left-0
      md:block
      md:fixed
      md:top-0
      md:bottom-0
      md:overflow-y-auto
      md:flex-row
      md:flex-nowrap
      md:overflow-hidden
      shadow-xl
      bg-white
      flex flex-wrap
      items-center
      justify-between
      relative
      md:w-64
      z-10
      py-4
      px-6
    "
  >
    <div
      class="
        md:flex-col md:items-stretch md:min-h-full md:flex-nowrap
        px-0
        flex flex-wrap
        items-center
        justify-between
        w-full
        mx-auto
      "
    >
      <!-- Toggler -->
      <button
        class="
          cursor-pointer
          text-black
          opacity-50
          md:hidden
          px-3
          py-1
          text-xl
          leading-none
          bg-transparent
          rounded
          border border-solid border-transparent
        "
        type="button"
        @click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
        class="
          md:block
          text-left
          md:pb-2
          text-blueGray-600
          mr-0
          inline-block
          whitespace-nowrap
          text-sm
          uppercase
          font-bold
          p-4
          px-0
        "
        to="/dashboard"
      >
        <img src="../../assets/img/condado-union.png" />
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>

      <!-- Collapse -->
      <div
        class="
          md:flex
          md:flex-col
          md:items-stretch
          md:opacity-100
          md:relative
          md:mt-4
          md:shadow-none
          shadow
          absolute
          top-0
          left-0
          right-0
          z-40
          overflow-y-auto overflow-x-hidden
          h-auto
          items-center
          flex-1
          rounded
        "
        :class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="
            md:min-w-full md:hidden
            block
            pb-4
            mb-4
            border-b border-solid border-blueGray-200
          "
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                class="
                  md:block
                  text-left
                  md:pb-2
                  text-blueGray-600
                  mr-0
                  inline-block
                  whitespace-nowrap
                  text-sm
                  uppercase
                  font-bold
                  p-4
                  px-0
                "
                to="/admin"
              >
                <img src="../../assets/img/condado-union.png" />
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                type="button"
                class="
                  cursor-pointer
                  text-black
                  opacity-50
                  md:hidden
                  px-3
                  py-1
                  text-xl
                  leading-none
                  bg-transparent
                  rounded
                  border border-solid border-transparent
                "
                @click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Form -->
        <!-- <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="
                border-0
                px-3
                py-2
                h-12
                border border-solid border-blueGray-500
                placeholder-blueGray-300
                text-blueGray-600
                bg-white
                rounded
                text-base
                leading-snug
                shadow-none
                outline-none
                focus:outline-none
                w-full
                font-normal
              "
            />
          </div>
        </form> -->

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->
        <h6
          class="
            md:min-w-full
            text-blueGray-500 text-xs
            uppercase
            font-bold
            block
            pt-1
            pb-4
            no-underline
          "
        >
          {{ userEmail() }}
        </h6>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center">
            <router-link :to="{ name: 'dashboard' }" v-slot="{ isActive }">
              <a
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-tv mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Dashboard
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link :to="{ name: 'account' }" v-slot="{ href, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-user mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Account
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link :to="{ name: 'transfer' }" v-slot="{ href, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-money-check-alt mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Transfer Funds
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              :to="{ name: 'statement' }"
              v-slot="{ href, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-table mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                ACCOUNT STATEMENT
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              :to="{ name: 'loan-calculator' }"
              v-slot="{ href, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-hand-holding-usd mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Request for a loan
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link :to="{ name: 'covid19' }" v-slot="{ href, isActive }">
              <a
                :href="href"
                @click="navigate"
                class="text-xs uppercase py-3 font-bold block"
                :class="[
                  isActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]"
              >
                <i
                  class="fas fa-viruses mr-2 text-sm"
                  :class="[isActive ? 'opacity-75' : 'text-blueGray-300']"
                ></i>
                Covid19 Tracker
              </a>
            </router-link>
          </li>

          <li class="items-center">
            <router-link
              @click="logout"
              class="
                text-blueGray-700
                hover:text-blueGray-500
                text-xs
                uppercase
                py-3
                font-bold
                block
              "
              to="/auth/login"
            >
              <i class="fas fa-sign-out-alt text-blueGray-300 mr-2 text-sm"></i>
              Logout
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
); }

<script>
import NotificationDropdown from "@/components/Dropdowns/NotificationDropdown.vue";
import UserDropdown from "@/components/Dropdowns/UserDropdown.vue";

export default {
  data() {
    return {
      collapseShow: "hidden",
    };
  },
  computed: {
    // userEmail() {
    //   return this.$store.getters["account/userEmail"]
    // }
  },
  methods: {
    userEmail() {
      const userEmailA = localStorage.getItem("userEmail");
      const userEmailB = this.$store.getters["account/userEmail"];

      if (!userEmailB) {
        return userEmailA;
      } else {
        return userEmailB;
      }
    },
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/auth/login");
    },
    navigate() {
      this.collapseShow = "hidden";
    },
  },
  components: {
    NotificationDropdown,
    UserDropdown,
  },
};
</script>


<style scoped>
@media only screen and (max-width: 600px) {
  img,
  video {
    max-width: 75%;
    height: auto;
  }
}
</style>
