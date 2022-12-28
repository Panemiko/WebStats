/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
