import { useEffect, useState } from "react"
import { Book, MessageCircle, Settings, Bell, BadgePlus, ChevronRight } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Avatar from "../ui/avatar"
import GroupChat from "../ui/group-chat"
import { getUserId } from "../../utils/token"
import { getAllChats } from "../../utils/get/chat"

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
    const [loadingChats, setLoadingChats] = useState(false)
    const [chats, setChats] = useState<RenderedChat[]>([])
    const [selectedChat, setSelectedChat] = useState<RenderedChat | null>(null) 
    const [selectedTopicName, setSelectedTopicName] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const tokenL = localStorage.getItem("token")

        if (!tokenL) navigate("/login")

        const userId = getUserId(tokenL as string)

        setLoadingChats(true)
        getAllChats(userId, tokenL as string)
            .then((data: Chat[]) => {
                const transformedChats = data.map((chat) => ({
                    id: chat.chat_id,
                    topicName: chat.topic_name,
                    users: chat.users.map((user) => user.user_name).join(", "),
                }))

                setChats(transformedChats)
            })
            .finally(() => {
                setLoadingChats(false)
            })
    }, [])

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Left Sidebar */}
            <div className="w-16 flex flex-col items-center justify-between border-r border-medium-gray">
                <div className="p-4">
                    <img src="/icon.png" alt="Logo" />
                </div>
                <nav className="flex flex-col gap-10 w-full items-center">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"
                            }`
                        }
                    >
                        <Book className="h-5 w-5" />
                    </NavLink>
                    <NavLink
                        to="/dashboard/notifications"
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"
                            }`
                        }
                    >
                        <Bell className="h-5 w-5" />
                    </NavLink>
                    <NavLink
                        to="/dashboard/send"
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"
                            }`
                        }
                    >
                        <BadgePlus className="h-5 w-5" />
                    </NavLink>
                </nav>
                <button className="aspect-square rounded-none mb-4">
                    <Settings className="h-5 w-5" />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <Outlet />
            </main>

            {/* Right Chat Sidebar */}
            <div
                className={`fixed right-0 top-0 h-full bg-dark-gray transition-all ease-in-out ${isChatOpen ? "w-96" : "w-0"
                    }`}
            >
                <div className="flex h-full">
                    <button
                        className="absolute -left-12 top-6"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        <MessageCircle className="h-5 w-5" />
                    </button>
                    <div className={`w-96 flex flex-col ${!isChatOpen && "hidden"}`}>
                        <div className="p-4 border-b border-medium-gray">
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold">
                                    {selectedChat ? (
                                        <button
                                            onClick={() => setSelectedChat(null)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Back to chats
                                        </button>
                                    ) : ("CHATS")}
                                </h2>
                                <button onClick={() => setIsChatOpen(false)}>
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 px-4 pt-4">
                            {!selectedChat ? (
                                <div className="space-y-4">
                                    {!loadingChats && chats.length > 0 ? (
                                        chats.map((chat) => (
                                            <button
                                                key={chat.id}
                                                className="w-full flex p-4 rounded transition-all hover:bg-medium-gray"
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
                                                        <p className="text-xs text-gray mt-1">{chat.topicName}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))
                                    ) : (
                                        <p>{loadingChats ? "Loading..." : "No chats available."}</p>
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
