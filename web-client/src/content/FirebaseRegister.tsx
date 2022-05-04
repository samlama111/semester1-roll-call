import '../styles/FbRegister.css'

import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import {
    auth,
    registerWithEmailAndPassword,
} from '../firebase'

function FirebaseRegister() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const register = () => {
        if (!name) alert('Please enter name')
        registerWithEmailAndPassword(name, email, password)
    }
    useEffect(() => {
        if (loading) return
        if (user) navigate('/dashboard')
    }, [user, loading])
    return (
        <div className="register">
            <div className="register__container">
                <input
                    type="text"
                    className="register__textBox"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"/>
                <input
                    type="text"
                    className="register__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"/>
                <input
                    type="password"
                    className="register__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"/>
                <button type="submit" className="register__btn" onClick={register}>
                    Register
                </button>
                <div>
                    Already have an account? <Link to="/">Login</Link> now.
                </div>
            </div>
        </div>
    )
}
export default FirebaseRegister
