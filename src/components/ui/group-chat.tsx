import { FormEvent, useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { gooeyToast as toast } from "goey-toast"
import { SendHorizontal } from "lucide-react"
import { io, type Socket } from "socket.io-client"
import Avatar from "./avatar"
import { getMessages } from "../../utils/get/messages"
import { sendMessage } from "../../utils/post/messages"
import { env } from "../../utils/env"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormattedMessages {
    id: string
    senderId: string
    sender: string
    content: string
    isCurrentUser: boolean
}

interface RawMessage {
    id: string
    sender: { name: string }
    content: string
    senderId: string
}

const formatMessage = (msg: RawMessage, currentUserId: string): FormattedMessages => ({
    id: msg.id,
    senderId: msg.senderId,
    sender: msg.sender.name,
    content: msg.content,
    isCurrentUser: msg.senderId === currentUserId,
})

const GroupChat = ({ chatId, token, currentUserId, topicName }: { chatId: string, token: string, currentUserId: string, topicName: string }) => {
    const [newMessage, setNewMessage] = useState("")
    const [liveMessages, setLiveMessages] = useState<FormattedMessages[]>([])
    const [sending, setSending] = useState(false)
    const socketRef = useRef<Socket | null>(null)

    const { data: fetchedMessages = [], error: messagesError } = useQuery({
        queryKey: ["messages", chatId],
        queryFn: () =>
            getMessages(chatId, token).then((rawMessages: RawMessage[]) =>
                rawMessages.map((raw) => formatMessage(raw, currentUserId))
            ),
    })

    useEffect(() => {
        if (messagesError) toast.error("No se pudieron cargar los mensajes")
    }, [messagesError])

    useEffect(() => {
        const socket = io(env.API)
        socketRef.current = socket
        socket.emit("joinRoom", chatId)

        socket.on("chatMessage", (raw: RawMessage) => {
            if (raw.senderId === currentUserId) return
            setLiveMessages((prev) => [...prev, formatMessage(raw, currentUserId)])
        })

        return () => {
            socket.disconnect()
            socketRef.current = null
        }
    }, [chatId, currentUserId])

    const messages = [...fetchedMessages, ...liveMessages]

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const content = newMessage.trim()
        if (!content || sending) return

        setSending(true)
        try {
            const { data } = await sendMessage(chatId, content, currentUserId, token)
            setLiveMessages((prev) => [...prev, formatMessage(data, currentUserId)])
            setNewMessage("")
            socketRef.current?.emit("chatMessage", { room: chatId, message: data })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo enviar el mensaje")
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="flex h-full items-center justify-center">
            <div className="mb-4 flex h-full w-full max-w-2xl flex-col rounded-lg border border-border bg-secondary shadow-md">
                <div className="border-b border-border p-4">
                    <h2 className="font-bold">{topicName}</h2>
                </div>
                <div className="h-full overflow-y-auto p-4">
                    {messages.length > 0 ? (
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn("flex", message.isCurrentUser ? "justify-end" : "justify-start")}
                                >
                                    <div
                                        className={cn(
                                            "flex items-end space-x-2",
                                            message.isCurrentUser ? "flex-row-reverse space-x-reverse" : "flex-row"
                                        )}
                                    >
                                        <Avatar names={[message.sender]} />
                                        <div
                                            className={cn(
                                                "max-w-xs rounded-lg px-4 py-2",
                                                message.isCurrentUser
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-muted text-foreground"
                                            )}
                                        >
                                            <p className="mb-1 text-sm font-semibold">{message.sender}</p>
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">Todavía no hay mensajes. Escribe el primero.</p>
                    )}
                </div>
                <div className="border-t border-border p-4">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
                        <Input
                            type="text"
                            placeholder="Type here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            disabled={sending}
                            className="bg-background"
                        />
                        <Button type="submit" size="icon" disabled={sending}>
                            <SendHorizontal className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GroupChat
