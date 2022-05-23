/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'
import { addMinutes } from '../services/helpers'
import { endRollCall, getRollCall, startRollCall } from '../services/rollCallService'
import { DbEnrollment } from '../shared/db/DbEnrollment'

const rollCallPossibleLenghts = [5, 10, 15, 20]

function StartCall() {
    const location = useLocation() 
    const { courseId } = location.state as any

    const [activeCall, setActiveCall] = React.useState<DbEnrollment>()
    const [timeStarted, setTimeStarted] = React.useState<Date>()
    const [duration, setDuration] = React.useState<number>(rollCallPossibleLenghts[0])
    const [stoppedCall, setStoppedCall] = React.useState(false)
    const [endedEnrollment, setEndedEnrollment] = React.useState<DbEnrollment>()
    
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
            const endResponse = await endRollCall(activeCall._id, courseId)
            if (endResponse.isSucc) {
                setStoppedCall(true)
                setEndedEnrollment(endResponse.res.enrollment)
            } 
        }
    }

    const checkRollCall = async (selectedCourseId: string) => {
        const existingRollCall = await getRollCall(selectedCourseId)
        if (existingRollCall && existingRollCall.res?.enrollment_info) {
            setActiveCall(existingRollCall.res?.enrollment_info)
            setTimeStarted(new Date(existingRollCall.res?.enrollment_info.date))
        }
    }
    React.useEffect(() => {
        checkRollCall(courseId)
    }, [courseId])
    return (
        <ScreenTemplate>
            <Grid container direction="column">
                {(activeCall && timeStarted)
                    ? (
                        <Grid item>
                            {!stoppedCall
                                ? (
                                    <>
                                        <Typography>
                                            Roll call started at {timeStarted.toLocaleTimeString()}
                                        </Typography>
                                        <Typography>
                                            Roll call will stop at 
                                            {addMinutes(timeStarted, duration).toLocaleTimeString()}
                                        </Typography>
                                    </>
                                ) : '' }  
                            {stoppedCall
                                ? (
                                    <>
                                        <Typography>
                                            Roll call stopped at {new Date().toLocaleTimeString()}
                                        </Typography>
                                        <Typography>
                                            Number of enrolled students: 
                                            { endedEnrollment?.enrolled_student_ids.length }
                                        </Typography>
                                    </>
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
