import { postJson } from '../http'
import type { Topic } from '../../lib/types'

interface CreateTopicPayload {
    title: string
    description: string
    ownerId: string
}

export const createTopic = (payload: CreateTopicPayload, token: string) =>
    postJson<{ message: string; data: Topic }>('/topics', payload, token)
