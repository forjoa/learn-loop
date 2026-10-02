import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function Hero() {
    return (
        <section className="bg-gradient-to-b from-card to-background py-20">
            <div className="container mx-auto flex flex-col items-center gap-10 px-4 md:flex-row">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 md:mb-0 md:w-1/2"
                >
                    <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl">
                        Share Knowledge, Empower Students
                    </h1>
                    <p className="mb-8 text-xl text-muted-foreground">
                        Learn Loop makes it easy for teachers to share content and
                        engage with students in a seamless learning environment.
                    </p>
                    <Button asChild size="lg" className="rounded-full px-8 text-lg">
                        <Link to="/signup">Get Started</Link>
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:w-1/2"
                >
                    <img
                        src="/online-student.png"
                        alt="Learn Loop Platform"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-2xl"
                    />
                </motion.div>
            </div>
        </section>
    )
}
