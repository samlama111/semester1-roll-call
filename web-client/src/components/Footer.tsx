import { Grid, Typography } from '@material-ui/core'
import React from 'react'

import { FooterLink } from '../styles/FooterStyles'
import { useFooterWrapperStyles } from '../styles/ScreenTemplateStyles'

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
                    <FooterLink href="https://kea.dk">KEA&apos;s website</FooterLink>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterLink href="https://keaplan.kea.dk/sws/prod2022F/default.aspx">
                        KEA&apos;s timetable
                    </FooterLink>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterLink href="https://kea-fronter.itslearning.com/index.aspx">Fronter</FooterLink>
                </Grid>
                <Grid item xs={6} md={3}>
                    <FooterLink href="https://github.com/samlama111/semester1-roll-call">Github repo</FooterLink>
                </Grid>
            </Grid>
        </Grid>
    )
}
export default Footer
