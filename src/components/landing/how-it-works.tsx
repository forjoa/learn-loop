import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
    const steps = [
        'Sign up for a Learn Loop account',
        'Create your virtual classroom',
        'Invite students to join',
        'Upload and organize your content',
        'Engage with students through discussions and feedback',
    ]

    return (
        <section id="how-it-works" className="bg-card py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
                    How Learn Loop Works
                </h2>
                <div className="mx-auto max-w-2xl">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.35, delay: index * 0.08 }}
                            className="mb-6 flex items-center"
                        >
                            <CheckCircle className="mr-4 h-6 w-6 shrink-0 text-primary" />
                            <p className="text-lg text-foreground">{step}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
