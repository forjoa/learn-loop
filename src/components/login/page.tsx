import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { env } from '../../utils/env.ts'
import Loader from '../ui/loader.tsx'

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const [ formData, setFormData ] = useState<LoginFormData>({
        email: '',
        password: '',
    })
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

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
            setLoading(true)
            fetch(`${env.API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(res => res.json())
                .then(data => {
                    if (!data.success && data.message) {
                        toast.error(data.message)
                    } else {
                        localStorage.setItem('token', data.token)
                        navigate('/dashboard')
                    }
                    setLoading(false)
                })
        }
    }

    return (
        <>
            {loading && <Loader/>}
            <div className="bg-black flex flex-col justify-center my-4 py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-dark-gray py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray">
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-medium-gray rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-gray text-white"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-medium-gray rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-gray text-white"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue focus:ring-blue border-medium-gray rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="#" className="font-medium text-blue hover:text-blue-500">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                                >
                                    Log in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-medium-gray"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-gray text-gray">
                  Don't have an account?
                </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    to="/signup"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue bg-medium-gray hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <Link
                        to="/"
                        className="flex items-center justify-center text-sm text-gray hover:text-blue transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Back to home
                    </Link>
                </div>
            </div>
        </>
    )
}

