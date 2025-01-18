import Header from '../landing/header.tsx'
import Footer from '../landing/footer.tsx'
import { Outlet } from 'react-router-dom'

export default function LandingLayout() {
    return (
        <main className="flex min-h-screen flex-col bg-black text-white">
            <Header/>
            <Outlet/>
            <Footer/>
        </main>
    )
}