import { BookOpen, Users, Zap } from 'lucide-react'

export default function Features() {
    const features = [
        {
            icon: <BookOpen className="w-12 h-12 text-blue"/>,
            title: 'Rich Content Sharing',
            description: 'Easily upload and share various types of content, from documents to multimedia.'
        },
        {
            icon: <Users className="w-12 h-12 text-blue"/>,
            title: 'Interactive Discussions',
            description: 'Foster engagement with built-in discussion forums and real-time chat.'
        },
        {
            icon: <Zap className="w-12 h-12 text-blue"/>,
            title: 'Instant Feedback',
            description: 'Provide timely feedback and assessments to keep students motivated.'
        },
    ]

    return (
        <section id="features" className="py-20 bg-medium-grey">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Effective Teaching</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-dark-grey p-6 rounded-lg shadow-lg">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-grey">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

