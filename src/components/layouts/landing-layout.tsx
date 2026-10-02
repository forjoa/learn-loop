import Header from '../landing/header.tsx'
import Footer from '../landing/footer.tsx'
import { Outlet } from 'react-router-dom'

export default function LandingLayout() {
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground">
            <Header/>
            <Outlet/>
            <Footer/>
        </main>
    )
}