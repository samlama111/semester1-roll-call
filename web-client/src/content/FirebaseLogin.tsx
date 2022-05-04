import '../styles/FbLogin.css'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth, logInWithEmailAndPassword } from '../firebase'

function FirebaseLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return
        }
        if (user) navigate('/dashboard')
    }, [user, loading])
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"/>
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
                <button type="submit" className="login__btn" onClick={() => logInWithEmailAndPassword(email, password)}>
                    Login
                </button>
                <div>
                    <Link to="/reset">Forgot Password</Link>
                </div>
                <div>
                    Do not have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    )
}
export default FirebaseLogin
