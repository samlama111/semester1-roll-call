import '../styles/FbReset.css'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth, sendPasswordReset } from '../firebase'

function FirebaseReset() {
    const [email, setEmail] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loading) return
        if (user) navigate('/dashboard')
    }, [user, loading])
    return (
        <div className="reset">
            <div className="reset__container">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"/>
                <button type="submit" className="reset__btn" onClick={() => sendPasswordReset(email)}>
                    Send password reset email
                </button>
                <div>
                    Do not have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    )
}
export default FirebaseReset
