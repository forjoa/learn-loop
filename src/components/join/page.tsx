import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { gooeyToast as toast } from 'goey-toast'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Compass } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getTopicPreview } from '@/utils/get/topics'
import { getEnrollmentStatus } from '@/utils/get/enrollments'
import { createEnrollment } from '@/utils/post/enrollments'
import { getUserId } from '@/utils/token'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function JoinTopic() {
    const { topicId } = useParams<{ topicId: string }>()
    const navigate = useNavigate()
    const [ requested, setRequested ] = useState(false)

    const token = localStorage.getItem('token')
    const userId = token ? getUserId(token) : null

    const { data: topic, isLoading: loadingTopic } = useQuery({
        queryKey: [ 'topic-preview', topicId ],
        queryFn: () => getTopicPreview(topicId as string),
        enabled: !!topicId,
    })

    const { data: enrollmentStatus, isLoading: checkingStatus } = useQuery({
        queryKey: [ 'enrollment-status', userId, topicId ],
        queryFn: () => getEnrollmentStatus(userId as string, topicId as string, token as string),
        enabled: !!token && !!userId && !!topicId && !!topic,
    })

    const requestJoin = useMutation({
        mutationFn: () => createEnrollment(userId as string, topicId as string, token as string),
        onSuccess: () => setRequested(true),
        onError: (error) => toast.error(error.message),
    })

    const isOwner = !!userId && !!topic && userId === topic.ownerId
    const isPending = requested || enrollmentStatus?.status === 'PENDING'
    const isApproved = enrollmentStatus?.status === 'APPROVED'

    const renderAction = () => {
        if (!token) {
            return (
                <div className="space-y-2">
                    <Button asChild className="w-full">
                        <Link to={`/login?redirect=${encodeURIComponent(`/join/${topicId}`)}`}>Iniciar sesión</Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full">
                        <Link to={`/signup?redirect=${encodeURIComponent(`/join/${topicId}`)}`}>Crear una cuenta</Link>
                    </Button>
                </div>
            )
        }

        if (isOwner) {
            return (
                <div className="space-y-2">
                    <p className="text-center text-sm text-muted-foreground">Este es tu propio tema.</p>
                    <Button className="w-full" onClick={() => navigate(`/dashboard/topics/${topicId}`)}>
                        Ver tema
                    </Button>
                </div>
            )
        }

        if (checkingStatus) {
            return <p className="text-center text-sm text-muted-foreground">Comprobando tu solicitud...</p>
        }

        if (isPending) {
            return (
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 rounded-md bg-secondary py-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Solicitud pendiente de aprobación
                    </div>
                    <Button variant="secondary" className="w-full" onClick={() => navigate('/dashboard')}>
                        Ir al inicio
                    </Button>
                </div>
            )
        }

        if (isApproved) {
            return (
                <div className="space-y-2">
                    <p className="text-center text-sm text-muted-foreground">Ya eres miembro de este tema.</p>
                    <Button className="w-full" onClick={() => navigate(`/dashboard/topics/${topicId}`)}>
                        Ir al tema
                    </Button>
                </div>
            )
        }

        return (
            <Button className="w-full" disabled={requestJoin.isPending} onClick={() => requestJoin.mutate()}>
                Solicitar unirme
            </Button>
        )
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-16 text-foreground">
            <Link to="/" className="mb-8 flex items-center gap-2 text-2xl font-bold text-primary">
                <img src="/icon.png" alt="Learn Loop" className="h-10 w-8" />
                Learn Loop
            </Link>

            {loadingTopic ? (
                <p className="text-sm text-muted-foreground">Cargando...</p>
            ) : !topic ? (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-3 text-center"
                >
                    <Compass className="h-12 w-12 text-muted-foreground" />
                    <h1 className="text-xl font-bold">Este tema no existe</h1>
                    <p className="max-w-sm text-sm text-muted-foreground">
                        El enlace puede estar roto o el tema ya no está disponible.
                    </p>
                    <Button asChild className="mt-2">
                        <Link to="/">Ir al inicio</Link>
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md space-y-6"
                >
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                                <BookOpen className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
                            <p className="text-sm text-muted-foreground">{topic.description}</p>
                            <div className="flex gap-4 text-xs text-muted-foreground">
                                <span>Profesor: {topic.ownerName}</span>
                                <span>{topic.memberCount} {topic.memberCount === 1 ? 'miembro' : 'miembros'}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {renderAction()}
                </motion.div>
            )}
        </div>
    )
}
