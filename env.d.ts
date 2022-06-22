/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: string;
  readonly VITE_LOCALHOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
