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
  locale: "en",
  messages: {
    en,
  },
});

const app = createApp(App);

app.use(router, i18n);

app.mount("#app");
