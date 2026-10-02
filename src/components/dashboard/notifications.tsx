import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { gooeyToast as toast } from 'goey-toast'
import { Bell, Check, Users, X } from 'lucide-react'
import { getNotifications } from '@/utils/get/notifications'
import { acceptEnrollment, denyEnrollment } from '@/utils/post/enrollments'
import { deleteNotification } from '@/utils/delete/notifications'
import { getUserId } from '@/utils/token'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Notifications() {
    const token = localStorage.getItem('token')
    const userId = token ? getUserId(token) : null
    const queryClient = useQueryClient()

    const { data: notifications = [], isLoading } = useQuery({
        queryKey: ['notifications', userId],
        queryFn: () => getNotifications(userId as string, token as string),
        enabled: !!token && !!userId,
    })

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['notifications', userId] })

    const resolveRequest = useMutation({
        mutationFn: ({ enrollmentId, action }: { enrollmentId: string; action: 'accept' | 'deny' }) =>
            action === 'accept'
                ? acceptEnrollment(enrollmentId, token as string)
                : denyEnrollment(enrollmentId, token as string),
        onSuccess: invalidate,
        onError: (error) => toast.error(error.message),
    })

    const dismiss = useMutation({
        mutationFn: (id: string) => deleteNotification(id, token as string),
        onSuccess: invalidate,
        onError: (error) => toast.error(error.message),
    })

    return (
        <div className="p-6">
            <h1 className="mb-1 text-2xl font-bold text-foreground">Notificaciones</h1>
            <p className="mb-6 text-sm text-muted-foreground">
                Solicitudes y novedades de tus temas.
            </p>

            {isLoading ? (
                <p className="text-sm text-muted-foreground">Cargando...</p>
            ) : notifications.length > 0 ? (
                <div className="space-y-2">
                    {notifications.map((notification) => (
                        <Card key={notification.id}>
                            <CardContent className="flex items-start justify-between gap-4 py-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 rounded-full bg-secondary p-2">
                                        {notification.enrollmentId ? (
                                            <Users className="h-4 w-4 text-primary" />
                                        ) : (
                                            <Bell className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{notification.title}</p>
                                        <p className="text-sm text-muted-foreground">{notification.content}</p>
                                        {notification.createdAt && (
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex shrink-0 gap-2">
                                    {notification.enrollmentId ? (
                                        <>
                                            <Button
                                                size="icon"
                                                variant="outline"
                                                disabled={resolveRequest.isPending}
                                                onClick={() =>
                                                    resolveRequest.mutate({ enrollmentId: notification.enrollmentId as string, action: 'deny' })
                                                }
                                            >
                                                <X className="h-4 w-4 text-destructive" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                disabled={resolveRequest.isPending}
                                                onClick={() =>
                                                    resolveRequest.mutate({ enrollmentId: notification.enrollmentId as string, action: 'accept' })
                                                }
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            disabled={dismiss.isPending}
                                            onClick={() => dismiss.mutate(notification.id)}
                                        >
                                            Descartar
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted-foreground">No hay notificaciones.</p>
            )}
        </div>
    )
}
