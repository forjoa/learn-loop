import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { gooeyToast as toast } from "goey-toast"
import { Book, MessageCircle, Settings, Bell, BadgePlus, ChevronRight } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Avatar from "../ui/avatar"
import GroupChat from "../ui/group-chat"
import { getUserId } from "../../utils/token"
import { getAllChats } from "../../utils/get/chat"
import { cn } from "@/lib/utils"

interface Chat {
    chat_id: number
    topic_id: number
    topic_name: string
    users: {
        user_id: number
        user_name: string
    }[]
}

interface RenderedChat {
    id: number
    topicName: string
    users: string
}

export default function DashboardLayout() {
    const [isChatOpen, setIsChatOpen] = useState(true)
    const [selectedChat, setSelectedChat] = useState<RenderedChat | null>(null)
    const [selectedTopicName, setSelectedTopicName] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const userId = token ? getUserId(token) : null

    useEffect(() => {
        if (!token) navigate("/login")
    }, [token, navigate])

    const { data: chats = [], isLoading: loadingChats, error: chatsError } = useQuery({
        queryKey: ["chats", userId],
        queryFn: () =>
            getAllChats(userId as number, token as string).then((data: Chat[]) =>
                data.map((chat) => ({
                    id: chat.chat_id,
                    topicName: chat.topic_name,
                    users: chat.users.map((user) => user.user_name).join(", "),
                })) as RenderedChat[]
            ),
        enabled: !!token && !!userId,
    })

    useEffect(() => {
        if (chatsError) toast.error(chatsError.message)
    }, [chatsError])

    const navItemClass = ({ isActive }: { isActive: boolean }) =>
        cn(
            "grid w-full place-items-center rounded-r-lg py-3 transition-all",
            isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
        )

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Left Sidebar */}
            <div className="flex w-16 flex-col items-center justify-between border-r border-border">
                <div className="p-4">
                    <img src="/icon.png" alt="Logo" />
                </div>
                <nav className="flex w-full flex-col items-center gap-10">
                    <NavLink to="/dashboard" end className={navItemClass}>
                        <Book className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="/dashboard/notifications" className={navItemClass}>
                        <Bell className="h-5 w-5" />
                    </NavLink>
                    <NavLink to="/dashboard/send" className={navItemClass}>
                        <BadgePlus className="h-5 w-5" />
                    </NavLink>
                </nav>
                <button className="mb-4 aspect-square rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Settings className="h-5 w-5" />
                </button>
            </div>

            {/* Main Content */}
            <main className="min-w-0 flex-1">
                <Outlet />
            </main>

            {/* Right Chat Sidebar */}
            <div
                className={cn(
                    "fixed right-0 top-0 h-full border-l border-border bg-card transition-all ease-in-out",
                    isChatOpen ? "w-96" : "w-0"
                )}
            >
                <div className="flex h-full">
                    <button
                        className="absolute -left-12 top-6 rounded-md bg-card p-2 text-muted-foreground transition-colors hover:text-foreground"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        <MessageCircle className="h-5 w-5" />
                    </button>
                    <div className={cn("flex w-96 flex-col", !isChatOpen && "hidden")}>
                        <div className="border-b border-border p-4">
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold">
                                    {selectedChat ? (
                                        <button
                                            onClick={() => setSelectedChat(null)}
                                            className="text-primary hover:underline"
                                        >
                                            Back to chats
                                        </button>
                                    ) : ("CHATS")}
                                </h2>
                                <button onClick={() => setIsChatOpen(false)} className="text-muted-foreground hover:text-foreground">
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 px-4 pt-4">
                            {!selectedChat ? (
                                <div className="space-y-2">
                                    {!loadingChats && chats.length > 0 ? (
                                        chats.map((chat) => (
                                            <button
                                                key={chat.id}
                                                className="flex w-full rounded-md p-4 transition-all hover:bg-accent"
                                                onClick={() => {
                                                    setSelectedChat(chat)
                                                    setSelectedTopicName(chat.topicName)
                                                }}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <Avatar names={chat.users.split(", ")} />
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-medium">
                                                            {chat.users.length > 20
                                                                ? chat.users.substring(0, 15) + "..."
                                                                : chat.users}
                                                        </span>
                                                        <p className="mt-1 text-xs text-muted-foreground">{chat.topicName}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {loadingChats ? "Loading..." : "No chats available."}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <GroupChat
                                    chatId={selectedChat.id}
                                    token={localStorage.getItem("token") as string}
                                    currentUserId={getUserId(localStorage.getItem("token") as string)}
                                    topicName={selectedTopicName}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
