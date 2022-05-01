import { Box } from '@material-ui/core'
import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'

import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'

function Dashboard() {
    const time = new Date().toLocaleString()
    const [cTime, setTime] = useState(time)
    // TODO: Sebrat lesson z DB
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>
    // TODO: Figure out how to make the method GetCurrentLesson only one run once
    // TODO: Fix the crazy time(it works 1/10 of the time, and when it does it has epilepsy)

    useEffect(() => {
        setInterval(() => {
            setTime(time)
        }, 1000000)
    })
    console.log('Ahoj')
    return (
        <ScreenTemplate>
            <Box>
                <div>{cTime}</div>
                <h2>Current lesson</h2>
                <DropdownRollCallDuration/>
                <Button id="startrollcall" variant="contained">Start Roll Call</Button>

                {/* Another div when Start Roll call is selected
                <h2>Roll call started at 17:19</h2>
                <h2>Roll call will end at 17:34</h2>
                <Button id="endrollcall" variant="contained">End Roll Call</Button> */}
            </Box>
        </ScreenTemplate>
    )
}

export default Dashboard
