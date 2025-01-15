interface Env {
    API: string
}

export const env: Env = {
    API: import.meta.env.API || 'https://learn-loop-backend.onrender.com'
}