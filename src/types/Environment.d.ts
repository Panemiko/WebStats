declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      VERCEL_URL?: string
    }
  }
}

// Converts the file into a module
export {}
