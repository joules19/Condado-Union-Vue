<template>
  <div class="container mx-auto h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="
            relative
            flex flex-col
            min-w-0
            break-words
            w-full
            mb-6
            shadow-lg
            rounded-lg
            bg-blueGray-200
            border-0
          "
        >
          <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-xl font-normal">Log in</h6>
            </div>
          </div>
          <div class="flex-auto px-6 lg:px-10 py-10 pt-0">
            <!-- <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div> -->
            <transition name="alert">
              <div class="flex flex-wrap justify-end mb-4" v-show="alertShow">
                <the-alert
                  @click="closeAlert"
                  :alertMessage="errorResponse"
                  alertMode="with-warning"
                ></the-alert>
              </div>
            </transition>
            <form @submit.prevent="submitForm">
              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    uppercase
                    text-blueGray-600 text-xs
                    font-bold
                    mb-2
                  "
                >
                  email
                </label>
                <input
                  type="email"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  placeholder="Enter Email"
                  v-model="email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="
                    block
                    uppercase
                    text-blueGray-600 text-xs
                    font-bold
                    mb-2
                  "
                >
                  Pin
                </label>
                <input
                  type="password"
                  class="
                    border-0
                    px-3
                    py-3
                    placeholder-blueGray-300
                    text-blueGray-600
                    bg-white
                    rounded
                    text-sm
                    shadow
                    focus:outline-none focus:ring
                    w-full
                    ease-linear
                    transition-all
                    duration-150
                  "
                  placeholder="Pin"
                  v-model="pin"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    id="customCheckLogin"
                    type="checkbox"
                    class="
                      form-checkbox
                      border-0
                      rounded
                      text-blueGray-700
                      ml-1
                      w-5
                      h-5
                      ease-linear
                      transition-all
                      duration-150
                    "
                  />
                  <span class="ml-2 text-sm font-normal text-blueGray-400">
                    Remember me
                  </span>
                </label>
              </div>
              <div class="flex flex-wrap justify-center mt-4 mb-4">
                <p style="font-size: 13px" v-show="!formIsValid">
                  Please enter a valid Email and password (must be at least 6
                  characters long).
                </p>
                <transition name="fade-spinner">
                  <base-spinner v-show="isLoading"></base-spinner>
                </transition>
                <div class="text-start mt-6" v-show="!isLoading">
                  <base-button mode="solid with-mt">{{
                    submitButtonCaption
                  }}</base-button>
                  <base-button
                    type="button"
                    mode="outline with-mt"
                    @click="switchAuthMode"
                    >{{ switchModeButtonCaption }}</base-button
                  >
                </div>
              </div>
            </form>
            <!-- <div class="flex flex-wrap mt-6 relative">
              <div class="w-1/2 font-semibold">
                <router-link to="/auth/register" class="text-blueGray-900">
                  <small>Forgot password?</small>
                </router-link>
              </div>
            </div> -->
          </div>
        </div>
        <!-- <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blueGray-900">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blueGray-900">
              <small>Create new account</small>
            </router-link>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import github from "@/assets/img/github.svg";
// import google from "@/assets/img/google.svg";

export default {
  data() {
    return {
      email: "",
      pin: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
      alertMode: "",
      alertMessage: "",
      blockeMessage:
        "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.email === "" || this.pin.length < 6) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        pin: this.pin,
      };

      try {
        // send http request
        if (this.mode === "login") {
          await this.$store.dispatch("login", actionPayload);
        } else {
          await this.$store.dispatch("signup", actionPayload);
        }
        this.$store.dispatch("setAlertShow", {
          status: false,
        });
        this.$router.replace("/dashboard");
      } catch (err) {
        this.error = err.message || "Failed to authenticate. try later";
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
    closeAlert() {
      this.$store.dispatch("setAlertShow", {
        status: false,
      });
    },
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Log in";
      } else {
        return "Sign up";
      }
    },
    switchModeButtonCaption() {
      if (this.mode === "login") {
        return "Create account?";
      } else {
        return "Login Instead";
      }
    },
    alertShow() {
      return this.$store.getters["alertShow"];
    },
    errorResponse() {
      let errorResp = "";
      if (this.$store.getters["errorResponse"] === "INVALID_PASSWORD") {
        errorResp =
          "Invalid Password! Ensure credentials are correct and try again.";
      } else if (this.$store.getters["errorResponse"] === "EMAIL_NOT_FOUND") {
        errorResp = "Hello, we can't find that email address in our records.";
      } else if (this.$store.getters["errorResponse"] === this.blockeMessage) {
        errorResp =
          "Access to this account has been temporarily disabled due to many failed login attempts.";
      } else {
        errorResp =
          "Something's not right... make sure you arwe connected to the internet.";
      }

      return errorResp;
    },
  },
};
</script>

<style>
.alert-enter-active {
  animation: modal 0.3s ease-out;
}

.alert-leave-active {
  animation: modal 0.3s ease-in reverse;
}

.fade-spinner-enter-from,
.fade-spinner-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.fade-spinner-enter-to,
.fade-spinner-leave-from {
  transform: translateY(0) scale(1);
  opacity: 1;
}

.fade-spinner-enter-active {
  transition: all 0.4s ease-out;
}

.fade-spinner-leave-active {
  transition: all 0.4s ease-in;
}

@keyframes modal {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
