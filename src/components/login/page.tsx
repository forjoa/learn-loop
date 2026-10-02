import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { gooeyToast as toast } from 'goey-toast'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../utils/post/auth.ts'
import Loader from '../ui/loader.tsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [ formData, setFormData ] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem('token', data.token)
            navigate('/dashboard')
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const validateForm = () => {
        if (!formData.email.trim()) {
            toast.error('Email is required')
            return false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            toast.error('Email is invalid')
            return false
        }
        if (!formData.password) {
            toast.error('Password is required')
            return false
        }
        return true
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            loginMutation.mutate(formData)
        }
    }

    return (
        <>
            {loginMutation.isPending && <Loader/>}
            <div className="flex min-h-[calc(100vh-72px)] flex-col justify-center bg-background px-4 py-16 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="sm:mx-auto sm:w-full sm:max-w-md"
                >
                    <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
                        Log in to your account
                    </h1>

                    <Card className="mt-8">
                        <CardContent className="pt-6">
                            <form className="space-y-5" onSubmit={handleSubmit}>
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
                                        autoComplete="current-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-input accent-primary"
                                        />
                                        <Label htmlFor="remember-me" className="font-normal text-muted-foreground">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Link to="#" className="text-sm font-medium text-primary hover:underline">
                                        Forgot your password?
                                    </Link>
                                </div>

                                <Button type="submit" className="w-full" size="lg">
                                    Log in
                                </Button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-border" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-card px-2 text-muted-foreground">
                                            Don&apos;t have an account?
                                        </span>
                                    </div>
                                </div>

                                <Button asChild variant="secondary" className="mt-6 w-full">
                                    <Link to="/signup">Sign up</Link>
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
