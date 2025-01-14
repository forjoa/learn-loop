import Header from './header.tsx'
import Hero from './hero.tsx'
import Features from './features.tsx'
import HowItWorks from './how-it-works.tsx'
import Testimonial from './testimonials.tsx'
import CTA from './cta.tsx'
import Footer from './footer.tsx'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-black text-white">
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            <Testimonial />
            <CTA />
            <Footer />
        </main>
    )
}

