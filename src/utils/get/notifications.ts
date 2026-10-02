import { env } from '../env'
import type { Notification } from '../../lib/types'

export const getNotifications = async (userId: string, token: string): Promise<Notification[]> => {
    const response = await fetch(`${env.API}/users/${userId}/notifications`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error al obtener las notificaciones')
    }

    return response.json()
}
