import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gooeyToast as toast } from 'goey-toast'
import { ArrowLeft, Check, Clock, MessageCircle, UserPlus, Users, X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getTopicById } from '@/utils/get/topics'
import { getPendingEnrollments } from '@/utils/get/enrollments'
import { acceptEnrollment, denyEnrollment } from '@/utils/post/enrollments'
import { getUserId } from '@/utils/token'
import { useDashboardChat } from '@/contexts/dashboard-chat'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Avatar from '@/components/ui/avatar'

export default function TopicDetail() {
    const { id } = useParams<{ id: string }>()
    const token = localStorage.getItem('token')
    const userId = token ? getUserId(token) : null
    const queryClient = useQueryClient()
    const { openChat } = useDashboardChat()

    const { data: topic, isLoading } = useQuery({
        queryKey: ['topic', id],
        queryFn: () => getTopicById(id as string, token as string),
        enabled: !!token && !!id,
    })

    const isOwner = !!topic && topic.ownerId === userId

    const { data: pendingRequests = [] } = useQuery({
        queryKey: ['enrollments', 'pending', id],
        queryFn: () => getPendingEnrollments(id as string, token as string),
        enabled: !!token && !!id && isOwner,
    })

    const resolveRequest = useMutation({
        mutationFn: ({ enrollmentId, action }: { enrollmentId: string; action: 'accept' | 'deny' }) =>
            action === 'accept'
                ? acceptEnrollment(enrollmentId, token as string)
                : denyEnrollment(enrollmentId, token as string),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['enrollments', 'pending', id] })
            if (variables.action === 'accept') {
                queryClient.invalidateQueries({ queryKey: ['topic', id] })
            }
        },
        onError: (error) => toast.error(error.message),
    })

    if (isLoading) {
        return <p className="p-6 text-sm text-muted-foreground">Cargando...</p>
    }

    if (!topic) {
        return (
            <div className="p-6">
                <p className="text-sm text-muted-foreground">No se encontró este tema.</p>
                <Link to="/dashboard" className="mt-4 inline-flex items-center text-sm text-primary hover:underline">
                    <ArrowLeft className="mr-1 h-4 w-4" /> Volver
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
                <ArrowLeft className="mr-1 h-4 w-4" /> Volver a tus temas
            </Link>

            <Card>
                <CardContent className="flex items-start justify-between gap-4 pt-6">
                    <div>
                        <h1 className="mb-2 text-2xl font-bold text-foreground">{topic.title}</h1>
                        <p className="text-muted-foreground">{topic.description}</p>
                    </div>
                    {topic.chatId && (
                        <Button
                            variant="outline"
                            className="shrink-0"
                            onClick={() => openChat(topic.chatId as string, topic.title)}
                        >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Abrir chat
                        </Button>
                    )}
                </CardContent>
            </Card>

            {isOwner && pendingRequests.length > 0 && (
                <section className="space-y-3">
                    <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <UserPlus className="h-4 w-4 text-primary" />
                        Solicitudes pendientes ({pendingRequests.length})
                    </h2>
                    <div className="space-y-2">
                        {pendingRequests.map((request) => (
                            <Card key={request.id}>
                                <CardContent className="flex items-center justify-between gap-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar names={[request.user.name]} />
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{request.user.name}</p>
                                            <p className="text-xs text-muted-foreground">{request.user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            disabled={resolveRequest.isPending}
                                            onClick={() => resolveRequest.mutate({ enrollmentId: request.id, action: 'deny' })}
                                        >
                                            <X className="h-4 w-4 text-destructive" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            disabled={resolveRequest.isPending}
                                            onClick={() => resolveRequest.mutate({ enrollmentId: request.id, action: 'accept' })}
                                        >
                                            <Check className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            <section className="space-y-3">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Users className="h-4 w-4 text-primary" />
                    Miembros
                </h2>
                <div className="flex flex-wrap gap-3">
                    {topic.users.map((member) => (
                        <div key={member.id} className="flex items-center gap-2 rounded-full bg-secondary py-1 pl-1 pr-3">
                            <Avatar names={[member.name]} />
                            <span className="text-sm text-foreground">{member.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-sm font-semibold text-foreground">Contenido</h2>
                {topic.posts.length > 0 ? (
                    <div className="space-y-2">
                        {topic.posts.map((post) => (
                            <Card key={post.id}>
                                <CardContent className="flex items-center justify-between py-4">
                                    <p className="font-medium text-foreground">{post.title}</p>
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">Todavía no hay contenido en este tema.</p>
                )}
            </section>
        </div>
    )
}
