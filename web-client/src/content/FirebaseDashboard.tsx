import '../styles/FbDashboard.css'

import {
    collection, getDocs, query, where 
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import { auth, db, logout } from '../firebase'

function FirebaseDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [user, loading, error] = useAuthState(auth)
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].data()
            setName(data.name)
        } catch (err) {
            console.error(err)
            alert('An error occured while fetching user data')
        }
    }
    useEffect(() => {
        if (loading) return
        if (!user) navigate('/')
        fetchUserName()
    }, [user, loading])
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                Logged in as
                <div>{name}</div>
                <div>{user?.email}</div>
                <button type="submit" className="dashboard__btn" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    )
}
export default FirebaseDashboard
