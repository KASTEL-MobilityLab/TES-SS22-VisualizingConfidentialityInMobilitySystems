import "@fortawesome/fontawesome-free/js/all.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "iconify-icon";
import "leaflet/dist/leaflet.css";
import "reflect-metadata";
import { createApp, ref } from "vue";
import { MarkerManager } from "./animation/MarkerManager";
import App from "./App.vue";
import { DataManager } from "./backend/DataManager";
import { i18n } from "./i18n";
import { DATA_MANAGER_KEY, MARKER_MANAGER_KEY } from "./keys";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(i18n);

/**
 * provide DataManager instance globally to all components
 * note: a component that needs access, has to inject it
 * with `const $dm = inject(dataManagerKey) as Ref<DataManager>`;
 */
const dm: DataManager = new DataManager();
const mm: MarkerManager = new MarkerManager();
app.provide(DATA_MANAGER_KEY, ref(dm));
app.provide(MARKER_MANAGER_KEY, ref(mm));

app.mount("#app");
