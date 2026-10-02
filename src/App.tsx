import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { GooeyToaster } from 'goey-toast'

import Home from './components/landing/page.tsx'
import LandingLayout from './components/layouts/landing-layout.tsx'
import SignUp from './components/signup/page.tsx'
import Login from './components/login/page.tsx'
import DashboardLayout from './components/layouts/dashboard-layout.tsx'
import DashboardHome from './components/dashboard/home.tsx'
import TopicDetail from './components/dashboard/topic-detail.tsx'
import Notifications from './components/dashboard/notifications.tsx'
import CreateTopic from './components/dashboard/create-topic.tsx'

function App() {
    return (
        <>
            <GooeyToaster richColors={true} />
            <BrowserRouter>
                <Routes>
                    <Route element={<LandingLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path='/dashboard' element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                        <Route path='topics/:id' element={<TopicDetail />} />
                        <Route path='notifications' element={<Notifications />} />
                        <Route path='send' element={<CreateTopic />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
