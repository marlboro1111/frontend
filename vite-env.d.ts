/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly OPENAI_API_KEY: string;
  readonly NEWSAPI_KEY: string;
  readonly VITE_GOOGLE_API_KEY: string;
  // Add more environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
