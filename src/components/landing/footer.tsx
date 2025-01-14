export default function Footer() {
    return (
        <footer className="bg-dark-grey py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-4">Learn Loop</h3>
                        <p className="text-grey">Empowering teachers to create engaging learning experiences.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-grey hover:text-blue transition-colors">About Us</a>
                            </li>
                            <li><a href="/features" className="text-grey hover:text-blue transition-colors">Features</a>
                            </li>
                            <li><a href="/contact" className="text-grey hover:text-blue transition-colors">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
                        <p className="text-grey mb-4">Subscribe to our newsletter for updates and tips.</p>
                        <form className="flex">
                            <input type="email" placeholder="Your email"
                                   className="bg-medium-grey text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue"/>
                            <button type="submit"
                                    className="bg-blue text-white px-4 py-2 rounded-r hover:bg-opacity-80 transition-colors">Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-medium-grey text-center text-grey">
                    <p>&copy; {new Date().getFullYear()} Learn Loop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

