import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import React, { useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'

import { getClasses } from '../client'
import LoginButton from '../components/LoginButton'
import ScreenTemplate from '../components/ScreenTemplate'

getClasses().then((res) => console.log(res.res?.classes))

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
// Login component - state of the login component and a reducer
type State = {
    username: string
    password: string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
  };
  
const initialState:State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
}
  
  type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };
  
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername': 
            return {
                ...state,
                username: action.payload
            }
        case 'setPassword': 
            return {
                ...state,
                password: action.payload
            }
        case 'setIsButtonDisabled': 
            return {
                ...state,
                isButtonDisabled: action.payload
            }
        case 'loginFailed': 
            return {
                ...state,
                helperText: action.payload,
                isError: true
            }
        case 'setIsError': 
            return {
                ...state,
                isError: action.payload
            }
        default:
            return {
                ...state
            }
    }
}
function Login() {
    const classes = useStyles()
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
  
    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            })
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            })
        }
    }, [state.username, state.password])
  
    const handleLogin = () => {
        if (state.username === 'email' && state.password === 'pass') {
            navigate('dashboard')
        } else {
            dispatch({
                type: 'loginFailed',
                payload: 'Incorrect username or password'
            })
        }
    }
  
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            // TODO: solve this other that by supressing
            // eslint-disable-next-line no-unused-expressions
            state.isButtonDisabled || handleLogin()
        }
    }
  
    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setUsername',
            payload: event.target.value
        })
    }
  
    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        dispatch({
            type: 'setPassword',
            payload: event.target.value
        })
    }
    return (
        <ScreenTemplate>
            <form className={classes.container} noValidate autoComplete="off">
                <Card style={{ margin: '0 auto' }}>
                    <CardHeader className={classes.header} title="Login to ABBA" />
                    <CardContent>
                        <div>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="username"
                                type="email"
                                label="Email"
                                placeholder="KEA teacher email"
                                margin="normal"
                                onChange={handleUsernameChange}
                                onKeyDown={handleKeyPress}/>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                margin="normal"
                                helperText={state.helperText}
                                onChange={handlePasswordChange}
                                onKeyDown={handleKeyPress}/>
                        </div>
                    </CardContent>
                    <CardActions>
                        <LoginButton isDisabled={state.isButtonDisabled} onLogin={handleLogin} />
                    </CardActions>
                </Card>
            </form>
        </ScreenTemplate>
    )
}
  
export default Login
