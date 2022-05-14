import React, { ReactElement } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'

import { auth } from '../firebase'

type Props = {  
  children: ReactElement
}

const AuthenticatedRoute: React.FC<Props> = ({ children }) => {
    const [user] = useAuthState(auth)

    if (user) return children
    else return <Navigate to="/login" />
}
export default AuthenticatedRoute
