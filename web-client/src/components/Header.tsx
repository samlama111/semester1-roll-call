import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export default function Header() {
    return (
        <AppBar>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}>
                    Attendance Buddy for the Board of Administration
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
