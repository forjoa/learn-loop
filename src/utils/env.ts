interface Env {
    API: string
}

const isDev = import.meta.env.DEV

export const env: Env = {
    API: import.meta.env.VITE_API_URL || (isDev ? 'http://localhost:8000' : 'https://learn-loop-backend.onrender.com')
}