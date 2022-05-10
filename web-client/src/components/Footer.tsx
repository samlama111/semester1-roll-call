import { Typography } from '@material-ui/core'
import Grid from '@mui/material/Grid'
import React from 'react'

import FooterButton from './FooterButton'
import { drawerWidth } from './Header'

function Footer() {
    return (
        <Grid 
            container
            spacing={1}
            sx={{
                backgroundColor: '#1976d2',
                position: 'fixed',
                bottom: 0, 
                height: '9rem',
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}>
            <Grid item xs={12}>
                <Typography 
                    align="center"
                    variant="h6"
                    style={{
                        color: 'white', fontWeight: 'bold' 
                    }}>
                    ABBA: Attendance Buddy for the Board of Administration
                </Typography>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={3}>
                    <FooterButton 
                        text="KEA&apos;s website"
                        onPressUrl="https://kea.dk" />
                </Grid>
                <Grid item xs={3}>
                    <FooterButton 
                        text="KEA&apos;s timetable"
                        onPressUrl="https://keaplan.kea.dk/sws/prod2022F/default.aspx" />
                </Grid>
                <Grid item xs={3}>
                    <FooterButton 
                        text="Fronter"
                        onPressUrl="https://kea-fronter.itslearning.com/index.aspx" />
                </Grid>
                <Grid item xs={3}>
                    <FooterButton 
                        text="Github repo"
                        onPressUrl="https://github.com/samlama111/semester1-roll-call" />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Footer
