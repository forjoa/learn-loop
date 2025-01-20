import { useState } from "react"
import { Book, MessageCircle, Settings, Bell, BadgePlus, ChevronRight, CirclePlus } from "lucide-react"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"
import Avatar from "../ui/avatar"

const chats = [
    {
        id: 1,
        name: "Sarah Wilson",
        message: "Hey! are you joining today class?",
        time: "11:30 PM",
        avatar: "/placeholder.svg?height=32&width=32",
    },
    {
        id: 2,
        name: "Mike Johnson, Jhon Doe, Sarah Wilson",
        message: "Will call you in 15 min!",
        time: "11:45 PM",
        avatar: "/placeholder.svg?height=32&width=32",
    }
]

export default function DashboardLayout() {
    const [isChatOpen, setIsChatOpen] = useState(true)

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Left Sidebar */}
            <div className="w-16 flex flex-col items-center justify-between border-r border-medium-gray">
                <div className="p-4">
                    <img src="/icon.png" alt="Logo" />
                </div>
                <nav className="flex flex-col gap-10 w-full items-center">
                    <NavLink
                        to='/dashboard'
                        end
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"}`
                        }
                    >
                        <Book className="h-5 w-5" />
                    </NavLink>
                    <NavLink
                        to='/dashboard/notifications'
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"}`
                        }
                    >
                        <Bell className="h-5 w-5" />
                    </NavLink>
                    <NavLink
                        to='/dashboard/send'
                        className={({ isActive }) =>
                            `w-full grid place-items-center py-3 rounded-r-lg transition-all ${isActive ? "bg-blue hover:bg-opacity-80" : "hover:bg-medium-gray"}`
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
                className={
                    `fixed right-0 top-0 h-full bg-dark-gray transition-all duration-300 ease-in-out ${isChatOpen ? "w-80" : "w-0"}`
                }
            >
                <div className="flex h-full">
                    <button
                        className="absolute -left-12 top-6"
                        onClick={() => setIsChatOpen(!isChatOpen)}
                    >
                        <MessageCircle className="h-5 w-5" />
                    </button>
                    <div className={`w-80 flex flex-col ${!isChatOpen && "hidden"}`}>
                        <div className="p-4 border-b border-medium-gray">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold">CHATS</h2>
                                <button onClick={() => setIsChatOpen(false)}>
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 px-4">
                            <div className="space-y-4 py-4">
                                {chats.map((chat) => (
                                    <button key={chat.id} className="w-full flex p-4 rounded transition-all hover:bg-medium-gray">
                                        <div className="flex w-full items-start gap-3">
                                            <div className="flex flex-col w-full gap-1">
                                                <div className="w-full flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar names={chat.name.split(', ')} />
                                                        <span className="text-sm font-medium">{chat.name.length > 20 ? chat.name.substring(0, 15) + '...' : chat.name}</span>
                                                    </div>
                                                    <span className="text-xs text-gray">{chat.time}</span>
                                                </div>
                                                <p className="text-xs text-gray text-start mt-1">{chat.message}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="px-4 pb-8 grid place-items-center">
                            <button className="flex items-center gap-2 rounded-lg bg-blue px-4 py-2 shadow transition-all hover:bg-opacity-80">
                                Create new chat <CirclePlus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

