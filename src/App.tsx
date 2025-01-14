import { Home, MessageCircle, Settings, Video } from 'lucide-react'

function App() {
    return (
        <nav className="flex w-16 flex-col items-center border-r bg-card px-2 py-4 h-screen">
            <div className="mb-8">
            <span
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-semibold text-primary-foreground">
                <img src='/icon.png' alt='Page icon'/>
            </span>
            </div>
            <div className="flex flex-1 flex-col gap-4">
                <Home className="h-5 w-5"/>
                <MessageCircle className="h-5 w-5"/>
                <Video className="h-5 w-5"/>
            </div>
            <div className="mt-auto flex flex-col gap-4">
                <Settings className="h-5 w-5"/>
            </div>
        </nav>
    )
}

export default App
