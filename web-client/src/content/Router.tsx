import React, { useEffect } from 'react'
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom'

import { connect } from '../client'
import Attendance from './Attendance'
import NotFound from '../components/NotFound'
import Dashboard from './Dashboard'
import Login from './Login'
import StartCall from './StartCall'

function Router() {
    useEffect(() => {
        connect()
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/rollcall" element={<StartCall />} />
                <Route path="/attendance" element={<Attendance />} />
                {/* TODO: add not found page */}
                <Route element={<NotFound />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}
export default Router
