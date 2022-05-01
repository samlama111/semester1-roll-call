import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import Dashboard from './Dashboard'
import Login from './Login'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* TODO: restrict paths based on authorization */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* TODO: add not found page */}
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
