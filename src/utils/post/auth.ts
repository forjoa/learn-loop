import { env } from '../env'

interface LoginPayload {
    email: string
    password: string
}

interface LoginResponse {
    token: string
    user: {
        id: string
        email: string
        name: string
        photo: string | null
        role: string
    }
}

interface RegisterPayload {
    name: string
    email: string
    password: string
    role: 'TEACHER' | 'STUDENT'
}

const postJson = async <T>(path: string, payload: unknown): Promise<T> => {
    const response = await fetch(`${env.API}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong, please try again')
    }

    return data
}

export const login = (payload: LoginPayload) => postJson<LoginResponse>('/auth/login', payload)

export const register = (payload: RegisterPayload) => postJson<{ message: string }>('/auth/register', payload)
