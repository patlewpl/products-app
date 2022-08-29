import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import BaseSpinner from "./components/ui/BaseSpinner.vue";
import BaseButton from "./components/ui/BaseButton.vue";

const app = createApp(App);

app.use(router);
app.use(store);

app.component("base-spinner", BaseSpinner);
app.component("base-button", BaseButton);

app.mount("#app");
