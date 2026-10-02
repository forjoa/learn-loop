import { ChangeEvent, FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { gooeyToast as toast } from 'goey-toast'
import { useNavigate } from 'react-router-dom'
import { createTopic } from '@/utils/post/topics'
import { getUserId } from '@/utils/token'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormData {
    title: string
    description: string
}

export default function CreateTopic() {
    const [formData, setFormData] = useState<FormData>({ title: '', description: '' })
    const token = localStorage.getItem('token')
    const ownerId = token ? getUserId(token) : null
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const createTopicMutation = useMutation({
        mutationFn: () => createTopic({ ...formData, ownerId: ownerId as string }, token as string),
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ['topics', ownerId] })
            toast.success('Tema creado correctamente')
            navigate(`/dashboard/topics/${data.id}`)
        },
        onError: (error) => toast.error(error.message),
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!formData.title.trim()) {
            toast.error('El título es obligatorio')
            return
        }
        if (!formData.description.trim()) {
            toast.error('La descripción es obligatoria')
            return
        }

        createTopicMutation.mutate()
    }

    return (
        <div className="p-6">
            <h1 className="mb-1 text-2xl font-bold text-foreground">Crear un tema</h1>
            <p className="mb-6 text-sm text-muted-foreground">
                Crea una nueva clase para compartir contenido con tus estudiantes.
            </p>

            <Card className="max-w-lg">
                <CardContent className="pt-6">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="p. ej. Matemáticas 101"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="De qué trata este tema"
                                className="flex w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        <Button type="submit" disabled={createTopicMutation.isPending}>
                            Crear tema
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
