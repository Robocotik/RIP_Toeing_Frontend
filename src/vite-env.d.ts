/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  // ...other env variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
