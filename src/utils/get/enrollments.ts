import { env } from '../env'
import type { PendingEnrollment } from '../../lib/types'

export const getPendingEnrollments = async (topicId: string, token: string): Promise<PendingEnrollment[]> => {
    const response = await fetch(`${env.API}/enrollments/pending?topicId=${topicId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error al obtener las solicitudes pendientes')
    }

    return response.json()
}
