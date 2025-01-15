import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

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
            console.log(formData)
        }
    }

    return (
        <div className="bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-dark-grey py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-grey">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-medium-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-grey text-white"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-grey">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-medium-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-grey text-white"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-grey">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-medium-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-grey text-white"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-grey">
                                Role
                            </label>
                            <div className="mt-1">
                                <select
                                    id="role"
                                    name="role"
                                    className="appearance-none block w-full px-3 py-2 border border-medium-grey rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue focus:border-blue sm:text-sm bg-medium-grey text-white"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="STUDENT">Student</option>
                                    <option value="TEACHER">Teacher</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-medium-grey"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-grey text-grey">
                  Already have an account?
                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue bg-medium-grey hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                            >
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <Link
                    to="/"
                    className="flex items-center justify-center text-sm text-grey hover:text-blue transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to home
                </Link>
            </div>
        </div>
    )
}

