import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { gooeyToast as toast } from 'goey-toast'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../utils/post/auth.ts'
import Loader from '../ui/loader.tsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormData {
    name: string;
    email: string;
    password: string;
    role: 'TEACHER' | 'STUDENT';
}

export default function SignUp() {
    const [ formData, setFormData ] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT',
    })
    const navigate = useNavigate()

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            navigate('/login')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const handleChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const {name, value} = e.target as HTMLInputElement | HTMLSelectElement // Garantizamos que `e.target` tiene `name` y `value`
        setFormData((prevState) => ({
            ...prevState,
            [name]: value.trim(),
        }))
    }

    const validateForm = (): boolean => {
        let isValid = true

        if (!formData.name.trim()) {
            toast.error('Name is required')
            isValid = false
        }

        if (!formData.email.trim()) {
            toast.error('Email is required')
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid')
            isValid = false
        }

        if (!formData.password) {
            toast.error('Password is required')
            isValid = false
        } else if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            isValid = false
        }

        if (![ 'TEACHER', 'STUDENT' ].includes(formData.role)) {
            toast.error('Invalid role selected')
            isValid = false
        }

        return isValid
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (validateForm()) {
            registerMutation.mutate(formData)
        }
    }

    return (
        <>
            {registerMutation.isPending && <Loader/>}
            <div className="flex min-h-[calc(100vh-72px)] flex-col justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
                        Create your account
                    </h1>

                    <Card className="mt-8">
                        <CardContent className="pt-6">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="role">Role</Label>
                                    <select
                                        id="role"
                                        name="role"
                                        className={cn(
                                            'flex h-10 w-full rounded-md border border-input bg-secondary px-3 py-2 text-sm text-foreground',
                                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                                        )}
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="STUDENT">Student</option>
                                        <option value="TEACHER">Teacher</option>
                                    </select>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Sign up
                                </Button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-card px-2 text-muted-foreground">
                                            Already have an account?
                                        </span>
                                    </div>
                                </div>

                                <Button asChild variant="secondary" className="mt-6 w-full">
                                    <Link to="/login">Log in</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Link
                        to="/"
                        className="mt-8 flex items-center justify-center text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to home
                    </Link>
                </motion.div>
            </div>
        </>
    )
}
