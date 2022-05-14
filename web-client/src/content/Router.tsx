import React, { useEffect } from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import { connect } from '../client'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import NotFound from '../components/NotFound'
import UnauthenticatedRoute from '../components/UnauthenticatedRoute'
import Attendance from './Attendance'
import Dashboard from './Dashboard'
import Login from './Login'
import Register from './Register'
import StartCall from './StartCall'

function Router() {
    useEffect(() => {
        connect()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
                <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
                <Route path="/register" element={<UnauthenticatedRoute><Register /></UnauthenticatedRoute>} />
                <Route path="/rollcall" element={<AuthenticatedRoute><StartCall /></AuthenticatedRoute>} />
                <Route path="/attendance" element={<AuthenticatedRoute><Attendance /></AuthenticatedRoute>} />
                <Route path="*" element={<AuthenticatedRoute><NotFound /></AuthenticatedRoute>} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
