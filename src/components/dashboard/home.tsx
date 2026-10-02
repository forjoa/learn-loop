import { useQuery } from '@tanstack/react-query'
import { getAllTopicsByUser } from '@/utils/get/topics'
import { getUserId } from '@/utils/token'
import TopicCard from './topic-card'

export default function DashboardHome() {
    const token = localStorage.getItem('token')
    const userId = token ? getUserId(token) : null

    const { data: topics = [], isLoading } = useQuery({
        queryKey: ['topics', userId],
        queryFn: () => getAllTopicsByUser(userId as string, token as string),
        enabled: !!token && !!userId,
    })

    return (
        <div className="p-6">
            <h1 className="mb-1 text-2xl font-bold text-foreground">Tus temas</h1>
            <p className="mb-6 text-sm text-muted-foreground">
                Clases en las que participas o que has creado.
            </p>

            {isLoading ? (
                <p className="text-sm text-muted-foreground">Cargando...</p>
            ) : topics.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {topics.map((topic) => (
                        <TopicCard key={topic.id} topic={topic} isMine={topic.ownerId === userId} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">
                    Todavía no formas parte de ningún tema. Crea uno nuevo desde el botón &quot;+&quot;.
                </p>
            )}
        </div>
    )
}
