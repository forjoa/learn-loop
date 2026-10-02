import { createContext, ReactNode, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllChats } from '@/utils/get/chat'
import { getUserId } from '@/utils/token'

export interface ChatListItem {
    id: string
    topicName: string
    members: string
}

interface DashboardChatContextValue {
    chats: ChatListItem[]
    loadingChats: boolean
    error: Error | null
    isChatOpen: boolean
    setIsChatOpen: (open: boolean) => void
    selectedChatId: string | null
    selectedTopicName: string
    openChat: (chatId: string, topicName: string) => void
    closeChat: () => void
}

const DashboardChatContext = createContext<DashboardChatContextValue | null>(null)

export function DashboardChatProvider({ children }: { children: ReactNode }) {
    const token = localStorage.getItem('token')
    const userId = token ? getUserId(token) : null

    const [isChatOpen, setIsChatOpen] = useState(true)
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [selectedTopicName, setSelectedTopicName] = useState('')

    const { data: chats = [], isLoading: loadingChats, error } = useQuery({
        queryKey: ['chats', userId],
        queryFn: () =>
            getAllChats(userId as string, token as string).then((data) =>
                data.map((chat) => ({
                    id: chat.id,
                    topicName: chat.topicName,
                    members: chat.members.map((member) => member.name).join(', '),
                }))
            ),
        enabled: !!token && !!userId,
    })

    const openChat = (chatId: string, topicName: string) => {
        setSelectedChatId(chatId)
        setSelectedTopicName(topicName)
        setIsChatOpen(true)
    }

    const closeChat = () => setSelectedChatId(null)

    return (
        <DashboardChatContext.Provider
            value={{
                chats,
                loadingChats,
                error,
                isChatOpen,
                setIsChatOpen,
                selectedChatId,
                selectedTopicName,
                openChat,
                closeChat,
            }}
        >
            {children}
        </DashboardChatContext.Provider>
    )
}

export function useDashboardChat() {
    const ctx = useContext(DashboardChatContext)
    if (!ctx) throw new Error('useDashboardChat must be used within a DashboardChatProvider')
    return ctx
}
