import { Snackbar } from '@material-ui/core'
import { Alert } from '@mui/material'
import React from 'react'

type Props = {  
    open: boolean,
    setClose: (open: any) => void,
    text: string
}

const ErrorAlert: React.FC<Props> = ({ open, setClose, text }) => {   
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={setClose}>
            <Alert onClose={setClose} variant="filled" severity="error">
                {text}
            </Alert>
        </Snackbar>
    )
}

export default ErrorAlert
