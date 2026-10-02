import { env } from './env'

const request = async <T>(path: string, options: RequestInit, token: string): Promise<T> => {
    const response = await fetch(`${env.API}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong, please try again')
    }

    return data
}

export const postJson = <T>(path: string, payload: unknown, token: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(payload) }, token)

export const deleteJson = <T>(path: string, token: string) =>
    request<T>(path, { method: 'DELETE' }, token)
