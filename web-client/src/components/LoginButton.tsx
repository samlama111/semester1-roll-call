import {
    Button, createStyles, makeStyles, Theme 
} from '@material-ui/core'
import React from 'react'

type Props = {
    isDisabled: boolean,
    onLogin: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
    },
}))

const LoginButton: React.FC<Props> = ({ isDisabled, onLogin }) => {
    const styles = useStyles()
    return (
        <Button
            variant="contained"
            size="large"
            color="secondary"
            className={styles.loginBtn}
            onClick={onLogin}
            disabled={isDisabled}>
            Login
        </Button>
    )
}
export default LoginButton
