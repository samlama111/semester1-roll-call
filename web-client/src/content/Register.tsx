import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

import AuthButton from '../components/AuthButton'
import ErrorAlert from '../components/ErrorAlert'
import ScreenTemplate from '../components/ScreenTemplate'
import { auth, registerWithEmailAndPassword } from '../firebase'
import { registerTeacher } from '../services/teacherService'

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

function Register() {
    const classes = useStyles()
    const navigate = useNavigate()
    // holds information about authenticated user
    const [user, loading] = useAuthState(auth)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = React.useState('')

    const handleRegister = async () => {
        try {
            await registerWithEmailAndPassword(name, email, password)
            const successRegistration = await registerTeacher(name, email)
            if (successRegistration.err) setErrorMessage(successRegistration.err.message)
            
        } catch (err: any) { setErrorMessage(err.message) }
    }
    const isSubmitDisabled = password.length <= 5 || email.length < 1 || name.length < 2
    useEffect(() => {
        // logout()
        if (loading) {
            // maybe trigger a loading screen
            return
        }
        if (user) navigate('/')
    }, [user, loading])

    return (
        <ScreenTemplate>
            <form className={classes.container} noValidate autoComplete="off">
                <Card style={{ margin: '0 auto' }}>
                    <CardHeader className={classes.header} title="Register to ABBA" />
                    <CardContent>
                        <div>
                            <TextField
                                value={name}
                                fullWidth
                                id="name"
                                label="Name"
                                placeholder="Full name"
                                margin="normal"
                                onChange={(e) => setName(e.target.value)}/>
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
                    <CardActions style={{ flexDirection: 'column' }}>
                        <AuthButton text="Register" isDisabled={isSubmitDisabled} onSubmit={handleRegister} />
                        <Typography style={{ marginTop: '1.5vh' }}>
                            Already have an account? <Link to="/login">Login now.</Link>
                        </Typography>
                    </CardActions>
                </Card>
            </form>
            <ErrorAlert
                open={errorMessage.length > 0}
                setClose={() => setErrorMessage('')}
                text={errorMessage} />
        </ScreenTemplate>
    )
}
  
export default Register
