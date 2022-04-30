import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import App from './App'
import Dashboard from './content/Dashboard'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* TODO: restrict paths based on authorization */}
                <Route path="/" element={<App />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* TODO: add not found page */}
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
