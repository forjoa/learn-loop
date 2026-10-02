import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function CTA() {
    return (
        <section className="bg-primary py-20">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="mb-6 text-3xl font-bold text-primary-foreground">
                        Ready to Transform Your Teaching?
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-primary-foreground/90">
                        Join thousands of teachers who are already using Learn Loop to create
                        engaging learning experiences for their students.
                    </p>
                    <Button
                        asChild
                        size="lg"
                        className="rounded-full bg-primary-foreground px-8 text-lg text-primary hover:bg-primary-foreground/90"
                    >
                        <Link to="/signup">Join Us</Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
