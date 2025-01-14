import { Bell, Book, Home, MessageCircle, Settings } from 'lucide-react'

function App() {
    return (
        <nav className="flex w-16 flex-col items-center border-r border-medium-grey bg-card px-14 py-8 h-screen">
            <div className="mb-20">
                <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
                    <img src="/icon.png" alt="Page icon"/>
                </span>
            </div>
            <div className="flex flex-1 flex-col gap-10">
                <Book className="h-7 w-7" strokeWidth={1.5}/>
                <Home className="h-7 w-7" strokeWidth={1.5}/>
                <MessageCircle className="h-7 w-7" strokeWidth={1.5}/>
                <Bell className="h-7 w-7" strokeWidth={1.5}/>
            </div>
            <div className="mt-auto flex flex-col gap-4">
                <Settings className="h-7 w-7" strokeWidth={1.5}/>
            </div>
        </nav>
    )
}

export default App
