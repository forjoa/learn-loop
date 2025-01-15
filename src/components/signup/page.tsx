import { ChangeEvent, FormEvent, useState } from 'react'
import { ArrowLeft } from 'lucide-react'

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

    const [ errors, setErrors ] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
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

    const validateForm = () => {
        const errors = {
            name: '',
            email: '',
            password: '',
            role: ''
        }
        if (!formData.name.trim()) errors.name = 'Name is required'
        if (!formData.email.trim()) errors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
        if (!formData.password) errors.password = 'Password is required'
        else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters'
        if (![ 'TEACHER', 'STUDENT' ].includes(formData.role)) errors.role = 'Invalid role selected'
        return errors
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formErrors = validateForm()
        console.log(formData)
        if (Object.keys(formErrors).length === 0) {
            console.log('Form submitted:', formData)
        } else {
            setErrors(formErrors)
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
                            {errors.name != '' && <p className="mt-2 text-sm text-red">{errors.name}</p>}
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
                            {errors.email != '' && <p className="mt-2 text-sm text-red">{errors.email}</p>}
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
                            {errors.password != '' && <p className="mt-2 text-sm text-red">{errors.password}</p>}
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
                            {errors.role && <p className="mt-2 text-sm text-red">{errors.role}</p>}
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
                            <a
                                href="/login"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue bg-medium-grey hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue"
                            >
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <a
                    href="/"
                    className="flex items-center justify-center text-sm text-grey hover:text-blue transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to home
                </a>
            </div>
        </div>
    )
}

