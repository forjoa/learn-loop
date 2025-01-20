import { env } from "../env"

export const getAllChats = async (userId: number, token: string) => {
    try {
        const response = await fetch(`${env.API}/chats/getAll?userId=${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los chats');
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error);
        throw error
    }
}