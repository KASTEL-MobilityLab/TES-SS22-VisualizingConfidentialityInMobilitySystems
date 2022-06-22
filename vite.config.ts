import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/TES-SS22-VisualizingConfidentialityInMobilitySystems/",
    plugins: [
      vue(),
      vueI18n({
        include: path.resolve(__dirname, "./src/locales/**"),
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      target: "es2020",
    },
    server: {
      port: parseInt(env.VITE_PORT),
    },
  };
});
