/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'
import { addMinutes } from '../services/dateService'
import { endRollCall, startRollCall } from '../services/rollCallService'
import { DbEnrollment } from '../shared/db/DbEnrollment'

const rollCallPossibleLenghts = [5, 10, 15, 20]

function StartCall() {
    const location = useLocation() 
    const { courseId } = location.state as any

    const [activeCall, setActiveCall] = React.useState<DbEnrollment>()
    const [timeStarted, setTimeStarted] = React.useState<Date>()
    const [duration, setDuration] = React.useState<number>(rollCallPossibleLenghts[0])
    const [stoppedCall, setStoppedCall] = React.useState(false)
    
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>

    const submit = async () => {
        const currentRollCall = await startRollCall(courseId)
        if (currentRollCall.isSucc && currentRollCall.res) {
            setActiveCall(currentRollCall.res?.roll_call)
            setTimeStarted(new Date())
        } else console.log('error starting roll call')
    }

    const onEndRollCall = async () => {
        if (activeCall) {
            const endRequest = await endRollCall(activeCall._id, courseId)
            if (endRequest.isSucc) setStoppedCall(true)
        }
    } 
    return (
        <ScreenTemplate>
            <Grid container direction="column">
                {(activeCall && timeStarted)
                    ? (
                        <Grid item>  
                            <Typography>
                                Roll call started at {timeStarted.toLocaleTimeString()}
                            </Typography>
                            <Typography>
                                Roll call will stop at {addMinutes(timeStarted, duration).toLocaleTimeString()}
                            </Typography>
                            {stoppedCall
                                ? (
                                    <Typography>
                                        Roll call stopped at {new Date().toLocaleTimeString()}
                                    </Typography>
                                ) 
                                : <Button onClick={onEndRollCall} variant="contained">End now</Button> }
                        </Grid>
                    ) : (
                        <>
                            <Grid item>
                                <h2>Current lesson</h2>
                                <DropdownRollCallDuration 
                                    duration={duration}
                                    setDuration={setDuration}
                                    possibleDurationValues={rollCallPossibleLenghts} />
                            </Grid>

                            <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained" onClick={submit}>
                                Start Roll Call
                            </Button>

                        </>
                    )}
            </Grid>
        </ScreenTemplate>
        
    )
}

export default StartCall
