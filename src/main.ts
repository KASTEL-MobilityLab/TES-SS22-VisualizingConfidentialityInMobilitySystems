import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "leaflet/dist/leaflet.css";
import "reflect-metadata";
import { createApp } from "vue";
import App from "./App.vue";
import { DataManager } from "./backend/DataManager";
import { i18n } from "./i18n";
import { dataManagerKey } from "./keys";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(i18n);

/**
 * provide DataManager instance globally to all components
 * note: a component that needs access, has to inject it
 * with `const $dm = inject(dataManagerKey) as DataManager`;
 */
const dm: DataManager = new DataManager();
app.provide(dataManagerKey, dm);

app.mount("#app");
