import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import AuthenticatedRoute from '../components/AuthenticatedRoute'
import UnauthenticatedRoute from '../components/UnauthenticatedRoute'
import Dashboard from './Dashboard'
import FirebaseRegister from './FirebaseRegister'
import Login from './Login'
import StartCall from './StartCall'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/reset" element={<FirebaseReset />} />
                <Route path="/dashboard" element={<FirebaseDashboard />} /> */}
                <Route path="/register" element={<FirebaseRegister />} />
                <Route path="/" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
                <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
                <Route path="/rollcall" element={<AuthenticatedRoute><StartCall /></AuthenticatedRoute>} />
                {/* TODO: add not found page */}
                <Route path="*" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
