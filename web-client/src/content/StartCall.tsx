import { Button, Grid } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'
import { startRollCall } from '../services/rollCallService'

function StartCall() {
    const location = useLocation() 
    const { courseId } = location.state as any
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>

    const submit = async () => {
        await startRollCall(courseId)
    }
    return (
        <ScreenTemplate>
            <Grid container direction="column">
                <Grid item>
                    <h2>Current lesson</h2>
                    <DropdownRollCallDuration/>
                </Grid>

                <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained" onClick={submit}>
                    Start Roll Call
                </Button>

                {/* Another div when Start Roll call is selected
                <h2>Roll call started at 17:19</h2>
                <h2>Roll call will end at 17:34</h2>
                <Button id="endrollcall" variant="contained">End Roll Call</Button> */}
            </Grid>
        </ScreenTemplate>
    )
}

export default StartCall
