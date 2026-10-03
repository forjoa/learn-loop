import { postJson } from '../http'

interface SentMessage {
    id: string
    chatId: string
    senderId: string
    content: string
    createdAt: string
    sender: { id: string; name: string }
}

export const sendMessage = (chatId: string, content: string, senderId: string, token: string) =>
    postJson<{ message: string; data: SentMessage }>(`/chats/${chatId}/messages`, { content, senderId }, token)
