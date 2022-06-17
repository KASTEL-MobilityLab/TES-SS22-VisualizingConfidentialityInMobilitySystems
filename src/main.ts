import de from "@/locales/de.json";
import en from "@/locales/en.json";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "leaflet/dist/leaflet.css";
import "reflect-metadata";
import { createApp, readonly } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import { DataManager } from "./backend/DataManager";
import { dataManagerKey } from "./keys";
import router from "./router";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallBackLocale: "en",
  messages: {
    en,
    de,
  },
});

const app = createApp(App);

app.use(router);
app.use(i18n);

/**
 * provide DataManager instance globally to all components
 * note: a component that needs access, has to inject it
 * with `const $dm = inject('$dataManager')`
 */
const dm: DataManager = new DataManager();
app.provide(dataManagerKey, readonly(dm));
// we have to use async lambda function to execute init because
// in some target builds, top level await is not available
// though we still run into issues with this because the loading
// takes roughly 83ms to run
const init = async () => await dm.init();
init();

app.mount("#app");
