import { env } from '../env'
import type { DetailedTopic, TopicWithUsers } from '../../lib/types'

export const getAllTopicsByUser = async (userId: string, token: string): Promise<TopicWithUsers[]> => {
    const response = await fetch(`${env.API}/topics/getAllByUser?userId=${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error al obtener los temas')
    }

    return response.json()
}

export const getTopicById = async (id: string, token: string): Promise<DetailedTopic> => {
    const response = await fetch(`${env.API}/topics/topic?id=${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Error al obtener el tema')
    }

    return response.json()
}
