import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [token] = useState(() => localStorage.getItem('token'))

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '#how-it-works', label: 'How It Works' },
        { href: '#testimonials', label: 'Testimonials' },
    ]

    return (
        <header className="border-b border-border bg-card py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link to="/" className="flex items-center text-2xl font-bold text-primary">
                    <img src="/icon.png" alt="Learn Loop Logo" className="mr-2 inline h-10 w-8" />
                    Learn Loop
                </Link>

                <button
                    className="text-foreground focus:outline-none md:hidden"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <nav
                    className={`absolute left-0 top-16 z-10 w-full bg-card transition-all md:static md:flex md:w-auto md:items-center md:space-x-6 md:bg-transparent ${isMenuOpen ? 'block' : 'hidden'}`}
                >
                    <ul className="flex flex-col space-y-4 px-4 md:flex-row md:space-x-6 md:space-y-0 md:px-0">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link to={link.href} className="text-foreground transition-colors hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <Button asChild className="hidden md:inline-flex">
                    <Link to={token != null ? '/dashboard' : '/signup'}>
                        {token != null ? 'Dashboard' : 'Sign Up'}
                    </Link>
                </Button>
            </div>

            {isMenuOpen && (
                <div className="bg-card px-4 py-2 md:hidden">
                    <ul className="space-y-4">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link to={link.href} className="text-foreground transition-colors hover:text-primary">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Button asChild className="w-full">
                                <Link to={token != null ? '/dashboard' : '/signup'}>
                                    {token != null ? 'Dashboard' : 'Sign Up'}
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    )
}
