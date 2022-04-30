import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import App from './App'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                {/* TODO: add not found page */}
                <Route path="*" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
