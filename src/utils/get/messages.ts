import { env } from "../env"

export const getMessages = async (chatId: number, token: string) => {
    try {
        const response = await fetch(`${env.API}/messages/get?chatId=${chatId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!response.ok) {
            throw new Error("Error al obtener los mensajes")
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}
