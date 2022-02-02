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
              <h6 class="text-blueGray-500 text-sm font-bold">Log In</h6>
            </div>
            <!-- <div class="btn-wrapper text-center">
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="github" />
                Github
              </button>
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="google" />
                Google
              </button>
            </div> -->
            <!-- <hr class="mt-6 border-b-1 border-blueGray-300" /> -->
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <!-- <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div> -->
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
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>
              <p v-show="!formIsValid">
                Please enter a valid Email and password (must be at least 6
                characters long).
              </p>
              <moon-loader v-show="isLoading"></moon-loader>
              <div class="text-start mt-6">
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
            </form>
            <div class="flex flex-wrap mt-6 relative">
              <div class="w-1/2 font-semibold">
                <router-link to="/auth/register" class="text-blueGray-900">
                  <small>Forgot password?</small>
                </router-link>
              </div>
            </div>
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
      // github,
      // google,
      email: "",
      pin: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
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
  },
};
</script>

<style scoped>
</style>