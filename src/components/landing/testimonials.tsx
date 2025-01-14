export default function Testimonial() {
    return (
        <section id="testimonials" className="py-20 bg-medium-grey">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Teachers Are Saying</h2>
                <div className="max-w-4xl mx-auto bg-dark-grey p-8 rounded-lg shadow-xl">
                    <div className="flex items-center mb-6">
                        <img src="/placeholder.svg" alt="Teacher" width={64} height={64}
                             className="rounded-full mr-4"/>
                        <div>
                            <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                            <p className="text-grey">High School Science Teacher</p>
                        </div>
                    </div>
                    <blockquote className="text-lg italic">
                        "Learn Loop has revolutionized the way I share content with my students. It's intuitive,
                        engaging, and has significantly improved student participation in my classes. I can't imagine
                        teaching without it now!"
                    </blockquote>
                </div>
            </div>
        </section>
    )
}

