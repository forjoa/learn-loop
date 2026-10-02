import { env } from '../env'

export interface ChatMember {
    id: string
    name: string
}

export interface Chat {
    id: string
    topicId: string
    topicName: string
    members: ChatMember[]
    lastMessage: string | null
    lastMessageDate: string | null
}

export const getAllChats = async (userId: string, token: string): Promise<Chat[]> => {
    try {
        const response = await fetch(`${env.API}/users/${userId}/chats`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los chats');
        }

        return response.json()
    } catch (error) {
        console.error('Error:', error);
        throw error
    }
}
