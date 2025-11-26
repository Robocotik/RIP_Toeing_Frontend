/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
  // ...other env variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
