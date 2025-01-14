export default function Hero() {
    return (
        <section className="py-20 bg-gradient-to-b from-dark-grey to-black">
            <div className="container mx-auto px-4 gap-10 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Knowledge, Empower Students</h1>
                    <p className="text-xl mb-8 text-grey">Learn Loop makes it easy for teachers to share content and
                        engage with students in a seamless learning environment.</p>
                    <a href="/signup"
                       className="bg-blue text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-colors">Get
                        Started</a>
                </div>
                <div className="md:w-1/2">
                    <img src="/online-student.png" alt="Learn Loop Platform" width={600} height={400}
                         className="rounded-lg shadow-2xl"/>
                </div>
            </div>
        </section>
    )
}

