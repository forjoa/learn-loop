import { FormEvent, useEffect, useState } from "react"
import Avatar from "./avatar"
import { getMessages } from "../../utils/get/messages"
import { SendHorizontal } from "lucide-react"

interface FormattedMessages {
    id: number,
    sender: string,
    content: string,
    isCurrentUser: boolean
}

const GroupChat = ({ chatId, token, currentUserId, topicName }: { chatId: number, token: string, currentUserId: number, topicName: string }) => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")

    const fetchAndFormatMessages = async () => {
        try {
            const rawMessages = await getMessages(chatId, token)
            const formattedMessages = rawMessages.map((msg: any) => ({
                id: msg.id,
                sender: msg.sender.name,
                content: msg.content,
                isCurrentUser: msg.senderId === currentUserId,
            }))
            setMessages(formattedMessages)
        } catch (error) {
            console.error("Error al cargar los mensajes:", error)
        }
    }

    useEffect(() => {
        fetchAndFormatMessages()
    }, [chatId, token])

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        // TODO: insert message and send in socket
        console.log("Enviando mensaje:", newMessage)
        setNewMessage("")
    }

    return (
        <div className="flex items-center justify-center h-full bg-dark-gray mb-4">
            <div className="w-full max-w-2xl h-full flex flex-col bg-medium-gray rounded-lg shadow-md mb-4">
                {/* Header */}
                <div className="p-4 border-b border-gray">
                    <h2 className="font-bold">{topicName}</h2>
                </div>
                {/* Chat Content */}
                <div className="p-4 overflow-y-auto h-full">
                    <div className="space-y-4">
                        {messages.map((message: FormattedMessages) => (
                            <div
                                key={message.id}
                                className={`flex ${message.isCurrentUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`flex items-end space-x-2 ${message.isCurrentUser ? "flex-row-reverse space-x-reverse" : "flex-row"
                                        }`}
                                >
                                    <Avatar names={[message.sender]} />
                                    <div
                                        className={`max-w-xs px-4 py-2 rounded-lg ${message.isCurrentUser ? "bg-blue text-white" : "bg-gray"
                                            }`}
                                    >
                                        <p className="text-sm font-semibold mb-1">{message.sender}</p>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-gray">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            placeholder="Type here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-600"
                        >
                            <SendHorizontal className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GroupChat