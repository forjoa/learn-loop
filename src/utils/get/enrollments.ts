import { env } from '../env'
import type { EnrollmentStatusRecord, PendingEnrollment } from '../../lib/types'

export const getPendingEnrollments = async (topicId: string, token: string): Promise<PendingEnrollment[]> => {
    const response = await fetch(`${env.API}/topics/${topicId}/enrollments`, {
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

export const getEnrollmentStatus = async (
    userId: string,
    topicId: string,
    token: string
): Promise<EnrollmentStatusRecord | null> => {
    const response = await fetch(`${env.API}/enrollments?userId=${userId}&topicId=${topicId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error al comprobar el estado de la solicitud')
    }

    return response.json()
}
