import { BookOpen, Users, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

export default function Features() {
    const features = [
        {
            icon: <BookOpen className="h-10 w-10 text-primary" />,
            title: 'Rich Content Sharing',
            description: 'Easily upload and share various types of content, from documents to multimedia.',
        },
        {
            icon: <Users className="h-10 w-10 text-primary" />,
            title: 'Interactive Discussions',
            description: 'Foster engagement with built-in discussion forums and real-time chat.',
        },
        {
            icon: <Zap className="h-10 w-10 text-primary" />,
            title: 'Instant Feedback',
            description: 'Provide timely feedback and assessments to keep students motivated.',
        },
    ]

    return (
        <section id="features" className="bg-background py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
                    Powerful Features for Effective Teaching
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <CardContent className="pt-6">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
