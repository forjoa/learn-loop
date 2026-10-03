import { postJson } from '../http'

interface CreatePostPayload {
    title: string
    content: string
    userId: string
    topicId: string
}

interface CreatedPost {
    id: string
    title: string
    content: string
    userId: string
    topicId: string
    createdAt: string
}

export const createPost = (payload: CreatePostPayload, token: string) =>
    postJson<{ message: string; data: CreatedPost }>('/posts', payload, token)
