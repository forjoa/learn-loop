interface Env {
    API: string
}

const isDev = import.meta.env.DEV

export const env: Env = {
    API: import.meta.env.API || isDev ? 'http://localhost:8000' : 'https://learn-loop-backend.onrender.com'
}