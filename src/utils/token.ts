import { queryClient } from '../lib/query-client'

export const getUserId = (token: string) => {
    const payload = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payload))

    return decodedPayload['userId']
}

export const clearSession = () => {
    localStorage.removeItem('token')
    queryClient.clear()
}
