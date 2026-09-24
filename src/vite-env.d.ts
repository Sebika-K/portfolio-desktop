/// <reference types="vite/client" />

// Tells TypeScript which VITE_ variables exist in .env.local,
// so import.meta.env.VITE_WEB3FORMS_KEY is known to be a string.
interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
