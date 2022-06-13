import de from "@/locales/de.json";
import en from "@/locales/en.json";
import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "leaflet/dist/leaflet.css";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
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

app.mount("#app");
