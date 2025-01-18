import { CheckCircle } from 'lucide-react'

export default function HowItWorks() {
    const steps = [
        'Sign up for a Learn Loop account',
        'Create your virtual classroom',
        'Invite students to join',
        'Upload and organize your content',
        'Engage with students through discussions and feedback'
    ]

    return (
        <section id="how-it-works" className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">How Learn Loop Works</h2>
                <div className="max-w-2xl mx-auto">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center mb-6">
                            <CheckCircle className="w-6 h-6 text-blue mr-4"/>
                            <p className="text-lg">{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

