import { createApp } from "vue";

// mouting point for the whole app
import App from "@/App.vue";
import router from "./router.js";
import store from "./store/index.js";

// styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// layouts
import BaseSpinner from "@/components/UI/BaseSpinner.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseScroller from "@/components/UI/BaseScroller.vue";
import BaseSpinnerButton from "@/components/UI/BaseSpinnerButton.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import theRightPopover from "@/components/Popovers/theRightPopover.vue";
import TheAlert from "@/components/Popovers/TheAlert.vue";

const app = createApp(App);
app.use(router);
app.use(store);

app.component("base-spinner", BaseSpinner);
BaseButton;
app.component("base-button", BaseButton);
app.component("base-scroller", BaseScroller);
app.component("the-alert", TheAlert);
app.component("clip-loader", ClipLoader);
app.component("base-spinner-button", BaseSpinnerButton);
app.component("the-right-popover", theRightPopover);

app.mount("#app");
