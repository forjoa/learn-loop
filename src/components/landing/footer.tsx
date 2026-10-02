import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
    return (
        <footer className="border-t border-border bg-card py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="mb-6 w-full md:mb-0 md:w-1/3">
                        <h3 className="mb-4 text-xl font-bold text-foreground">Learn Loop</h3>
                        <p className="text-muted-foreground">
                            Empowering teachers to create engaging learning experiences.
                        </p>
                    </div>
                    <div className="mb-6 w-full md:mb-0 md:w-1/3">
                        <h4 className="mb-4 text-lg font-semibold text-foreground">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/about" className="text-muted-foreground transition-colors hover:text-primary">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/features" className="text-muted-foreground transition-colors hover:text-primary">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="mb-4 text-lg font-semibold text-foreground">Stay Connected</h4>
                        <p className="mb-4 text-muted-foreground">Subscribe to our newsletter for updates and tips.</p>
                        <form className="flex gap-2">
                            <Input type="email" placeholder="Your email" />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>
                <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Learn Loop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
