export default function Header() {
    return (
        <header className="bg-dark-grey py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <a href="/" className="text-2xl font-bold text-blue">Learn Loop</a>
                <nav>
                    <ul className="flex space-x-6">
                        <li><a href="#features" className="hover:text-blue transition-colors">Features</a></li>
                        <li><a href="#how-it-works" className="hover:text-blue transition-colors">How It Works</a></li>
                        <li><a href="#testimonials" className="hover:text-blue transition-colors">Testimonials</a></li>
                    </ul>
                </nav>
                <a href="/signup"
                   className="bg-blue text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">Sign Up</a>
            </div>
        </header>
    )
}

