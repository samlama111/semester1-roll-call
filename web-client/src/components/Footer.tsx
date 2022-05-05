import { Grid, Typography } from '@material-ui/core'
import React from 'react'

import { useFooterWrapperStyles } from '../styles/ScreenTemplateStyles'
import FooterButton from './FooterButton'

function Footer() {
    const styles = useFooterWrapperStyles()
    return (
        <Grid 
            container
            style={{
                backgroundColor: '#1976d2',
                position: 'absolute',
                bottom: 0, 
                minHeight: '15vh',
            }}
            className={styles.topMargin}>
            <Grid item xs={12}>
                <Typography 
                    align="center"
                    variant="h6"
                    style={{
                        paddingTop: '4vh', color: 'white', paddingBottom: '4vh', fontWeight: 'bold' 
                    }}>
                    ABBA: Attendance Buddy for the Board of Administration
                </Typography>
            </Grid>
            <Grid container direction="row" style={{ paddingBottom: '4vh' }}>
                <Grid item xs={6} md={3}>
                    <FooterButton 
                        text="KEA&apos;s website"
                        onPressUrl="https://kea.dk" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterButton 
                        text="KEA&apos;s timetable"
                        onPressUrl="https://keaplan.kea.dk/sws/prod2022F/default.aspx" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterButton 
                        text="Fronter"
                        onPressUrl="https://kea-fronter.itslearning.com/index.aspx" />
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterButton 
                        text="Github repo"
                        onPressUrl="https://github.com/samlama111/semester1-roll-call" />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Footer
