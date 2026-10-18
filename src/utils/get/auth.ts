import { env } from '../env'

// Only a 401 means the session is over; a down or waking server must not log the user out
export const isTokenValid = async (token: string): Promise<boolean> => {
    const response = await fetch(`${env.API}/auth/me/${token}`)

    if (response.status === 401) {
        return false
    }

    if (!response.ok) {
        throw new Error('No se pudo comprobar la sesión')
    }

    return true
}
