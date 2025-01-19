import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import Home from './components/landing/page.tsx'
import LandingLayout from './components/layouts/landing-layout.tsx'
import SignUp from './components/signup/page.tsx'
import Login from './components/login/page.tsx'
import DashboardLayout from './components/layouts/dashboard-layout.tsx'

function App() {
    return (
        <>
            <Toaster richColors={true} />
            <BrowserRouter>
                <Routes>
                    <Route element={<LandingLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path='/dashboard' element={<DashboardLayout />}>
                        <Route index element={<p>welcome </p>} />
                        <Route path='notifications' element={<p>welcome notifications </p>} />
                        <Route path='send' element={<p>welcome send </p>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
