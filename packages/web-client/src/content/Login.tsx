import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

import AuthButton from '../components/AuthButton'
import ScreenTemplate from '../components/ScreenTemplate'
import { auth, logInWithEmailAndPassword } from '../firebase'

const useStyles = makeStyles(() => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '95%',
        padding: '2vw'
    },
    header: {
        textAlign: 'center',
        background: '#212121',
        color: '#fff'
    }
}))

function Login() {
    const classes = useStyles()
    const navigate = useNavigate()
    // holds information about authenticated user
    const [user, loading] = useAuthState(auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        logInWithEmailAndPassword(email, password)
    }
    const isSubmitDisabled = password.length <= 5 || email.length < 1
    useEffect(() => {
        // logout()
        if (loading) {
            // maybe trigger a loading screen
            return
        }
        if (user) navigate('/dashboard')
    }, [user, loading])

    return (
        <ScreenTemplate>
            <form className={classes.container} noValidate autoComplete="off">
                <Card style={{ margin: '0 auto' }}>
                    <CardHeader className={classes.header} title="Login to ABBA" />
                    <CardContent>
                        <div>
                            <TextField
                                value={email}
                                fullWidth
                                id="username"
                                type="email"
                                label="Email"
                                placeholder="KEA teacher email"
                                margin="normal"
                                onChange={(e) => setEmail(e.target.value)}/>
                            <TextField
                                value={password}
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </CardContent>
                    <CardActions>
                        <AuthButton text="Login" isDisabled={isSubmitDisabled} onSubmit={handleLogin} />
                    </CardActions>
                </Card>
            </form>
        </ScreenTemplate>
    )
}
  
export default Login
