import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/TES-SS22-VisualizingConfidentialityInMobilitySystems/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
