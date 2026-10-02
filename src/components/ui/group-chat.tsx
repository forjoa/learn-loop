import { FormEvent, useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { gooeyToast as toast } from "goey-toast"
import { SendHorizontal } from "lucide-react"
import Avatar from "./avatar"
import { getMessages } from "../../utils/get/messages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormattedMessages {
    id: number,
    sender: string,
    content: string,
    isCurrentUser: boolean
}

interface RawMessage {
    id: number,
    sender: { name: string },
    content: string,
    senderId: number
}

const GroupChat = ({ chatId, token, currentUserId, topicName }: { chatId: number, token: string, currentUserId: number, topicName: string }) => {
    const [newMessage, setNewMessage] = useState("")

    const { data: messages = [], error: messagesError } = useQuery({
        queryKey: ["messages", chatId],
        queryFn: () =>
            getMessages(chatId, token).then((rawMessages: RawMessage[]) =>
                rawMessages.map((msg) => ({
                    id: msg.id,
                    sender: msg.sender.name,
                    content: msg.content,
                    isCurrentUser: msg.senderId === currentUserId,
                })) as FormattedMessages[]
            ),
    })

    useEffect(() => {
        if (messagesError) toast.error("No se pudieron cargar los mensajes")
    }, [messagesError])

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!newMessage.trim()) return

        // TODO: insert message and send in socket
        console.log("Enviando mensaje:", newMessage)
        setNewMessage("")
    }

    return (
        <div className="flex h-full items-center justify-center">
            <div className="mb-4 flex h-full w-full max-w-2xl flex-col rounded-lg border border-border bg-secondary shadow-md">
                {/* Header */}
                <div className="border-b border-border p-4">
                    <h2 className="font-bold">{topicName}</h2>
                </div>
                {/* Chat Content */}
                <div className="h-full overflow-y-auto p-4">
                    <div className="space-y-4">
                        {messages.map((message: FormattedMessages) => (
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
                </div>
                <div className="border-t border-border p-4">
                    <form className="flex gap-2" onSubmit={handleSendMessage}>
                        <Input
                            type="text"
                            placeholder="Type here..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="bg-background"
                        />
                        <Button type="submit" size="icon">
                            <SendHorizontal className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GroupChat
