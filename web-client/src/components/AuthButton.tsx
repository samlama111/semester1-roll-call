import {
    Button, createStyles, makeStyles, Theme 
} from '@material-ui/core'
import React from 'react'

type Props = {
    isDisabled: boolean,
    onSubmit: () => void,
    text: string
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    loginBtn: {
        marginTop: theme.spacing(2),
        flexGrow: 1
    },
}))

const AuthButton: React.FC<Props> = ({ isDisabled, onSubmit, text }) => {
    const styles = useStyles()
    return (
        <Button
            variant="contained"
            size="large"
            color="secondary"
            className={styles.loginBtn}
            onClick={onSubmit}
            disabled={isDisabled}>
            {text}
        </Button>
    )
}
export default AuthButton
