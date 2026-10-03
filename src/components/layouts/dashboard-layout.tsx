import { useEffect } from "react"
import { gooeyToast as toast } from "goey-toast"
import { Book, MessageCircle, Settings, Bell, BadgePlus, ChevronRight } from "lucide-react"
import { Outlet, useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Avatar from "../ui/avatar"
import GroupChat from "../ui/group-chat"
import { getUserId } from "../../utils/token"
import { cn } from "@/lib/utils"
import { DashboardChatProvider, useDashboardChat } from "@/contexts/dashboard-chat"

const navItemClass = ({ isActive }: { isActive: boolean }) =>
    cn(
        "grid w-full place-items-center rounded-r-lg py-3 transition-all",
        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"
    )

function DashboardShell() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const {
        chats,
        loadingChats,
        error: chatsError,
        isChatOpen,
        setIsChatOpen,
        selectedChatId,
        selectedTopicName,
        openChat,
        closeChat,
    } = useDashboardChat()

    useEffect(() => {
        if (!token) navigate("/login")
    }, [token, navigate])

    useEffect(() => {
        if (chatsError) toast.error(chatsError.message)
    }, [chatsError])

    return (
        <div className="flex h-screen bg-background text-foreground">
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

            <main className={cn("min-w-0 flex-1 overflow-y-auto transition-[margin] ease-in-out", isChatOpen && "mr-96")}>
                <Outlet />
            </main>

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
                                    {selectedChatId ? (
                                        <button onClick={closeChat} className="text-primary hover:underline">
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
                            {!selectedChatId ? (
                                <div className="space-y-2">
                                    {!loadingChats && chats.length > 0 ? (
                                        chats.map((chat) => (
                                            <button
                                                key={chat.id}
                                                className="flex w-full rounded-md p-4 transition-all hover:bg-accent"
                                                onClick={() => openChat(chat.id, chat.topicName)}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <Avatar names={chat.members.split(", ")} />
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-medium">
                                                            {chat.members.length > 20
                                                                ? chat.members.substring(0, 15) + "..."
                                                                : chat.members}
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
                                    key={selectedChatId}
                                    chatId={selectedChatId}
                                    token={token as string}
                                    currentUserId={getUserId(token as string)}
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

export default function DashboardLayout() {
    return (
        <DashboardChatProvider>
            <DashboardShell />
        </DashboardChatProvider>
    )
}
