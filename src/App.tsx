import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/landing/page.tsx'
import LandingLayout from './components/layouts/landing-layout.tsx'
import SignUp from './components/signup/page.tsx'
import { Toaster } from 'sonner'

function App() {
    return (
        <>
            <Toaster richColors={true}/>
            <BrowserRouter>
                <Routes>
                    <Route element={<LandingLayout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
