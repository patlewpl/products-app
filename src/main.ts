import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import i18n from "./plugins/i18n.js";

import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.component("base-spinner", BaseSpinner);
app.component("base-button", BaseButton);
app.component("base-dialog", BaseDialog);

app.mount("#app");
