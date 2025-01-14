import Home from './components/landing/page.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingLayout from './components/layouts/landing-layout.tsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LandingLayout/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
