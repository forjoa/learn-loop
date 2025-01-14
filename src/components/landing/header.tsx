import { useState } from 'react'

export default function Header() {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="bg-dark-grey py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <a href="/" className="text-2xl font-bold text-blue">
                    <img src="/icon.png" alt="Learn Loop Logo" className="w-8 h-10 inline mr-2"/>
                    Learn Loop
                </a>
                {/* Botón de menú hamburguesa */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Navegación */}
                <nav
                    className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 w-full md:w-auto bg-dark-grey md:bg-transparent z-10 transition-all`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 px-4 md:px-0">
                        <li><a href="#features" className="hover:text-blue transition-colors">Features</a></li>
                        <li><a href="#how-it-works" className="hover:text-blue transition-colors">How It Works</a></li>
                        <li><a href="#testimonials" className="hover:text-blue transition-colors">Testimonials</a></li>
                    </ul>
                </nav>

                <a
                    href="/signup"
                    className="hidden md:inline-block bg-blue text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors"
                >
                    Sign Up
                </a>
            </div>

            {/* Menú desplegable */}
            {isMenuOpen && (
                <div className="md:hidden bg-dark-grey px-4 py-2">
                    <ul className="space-y-4">
                        <li><a href="#features" className="hover:text-blue transition-colors">Features</a></li>
                        <li><a href="#how-it-works" className="hover:text-blue transition-colors">How It Works</a></li>
                        <li><a href="#testimonials" className="hover:text-blue transition-colors">Testimonials</a></li>
                        <li><a href="/signup"
                               className="block bg-blue text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Sign
                            Up</a></li>
                    </ul>
                </div>
            )}
        </header>
    )
}

