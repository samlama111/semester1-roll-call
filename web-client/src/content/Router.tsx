import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'
import StartCall from './StartCall'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* TODO: restrict paths based on authorization */}
                {/* <Route path="/" element={<Login />} /> */}
                {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                {/* <Route path="/" element={<FirebaseLogin />} />
                <Route path="/register" element={<FirebaseRegister />} />
                <Route path="/reset" element={<FirebaseReset />} />
                <Route path="/dashboard" element={<FirebaseDashboard />} /> */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rollcall" element={<StartCall />} />
                {/* TODO: add not found page */}
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
