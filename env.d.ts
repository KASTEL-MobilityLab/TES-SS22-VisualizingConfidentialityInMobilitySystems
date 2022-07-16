/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_LOCALHOST: string;
  readonly VITE_MAPBOX_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
