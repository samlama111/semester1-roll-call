import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

import ClassSelect from '../components/ClassSelect'
import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'
import { getClasses } from '../services/classService'
import { DbClass } from '../shared/db/DbClass'

function Dashboard() {
    const [teacherClasses, setTeacherClasses] = React.useState<DbClass[]>([])
    const [selectedClass, setSelectedClass] = React.useState<string>('')
    const [renderClass, setRenderClass] = React.useState(true)
    const [renderStart, setRenderStart] = React.useState(false)
    // TODO: Sebrat lesson z DB
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>
    const fetchClasses = async () => {
        const fetchedClasses = await getClasses('627413d48f24d2c629f5694f')
        if (fetchedClasses.isSucc && fetchedClasses.res) {
            // eslint-disable-next-line no-underscore-dangle
            setSelectedClass(fetchedClasses.res.classes[0]._id)
            setTeacherClasses(fetchedClasses.res.classes)
        }
    }
    const submit = () => {
        if (renderClass) {
            setRenderStart(true)
            setRenderClass(false)
        }
    }
    React.useEffect(() => {
        fetchClasses().then()
    }, [])
    return (
        <ScreenTemplate>
            <Grid container direction="column">
                {renderClass && (
                    <Grid item>
                        <Typography variant="h5">Select class</Typography>
                        <ClassSelect
                            classes={teacherClasses}
                            selectedClass={selectedClass}
                            setSelectedClass={setSelectedClass} />
                    </Grid>
                )}
                {renderStart && (
                    <Grid item>
                        <h2>Current lesson</h2>
                        <DropdownRollCallDuration/>
                    </Grid>
                )}
                
                <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained" onClick={submit}>
                    {renderClass && 'Submit class'}
                    {renderStart && 'Start Roll Call'}
                </Button>

                {/* Another div when Start Roll call is selected
                <h2>Roll call started at 17:19</h2>
                <h2>Roll call will end at 17:34</h2>
                <Button id="endrollcall" variant="contained">End Roll Call</Button> */}
            </Grid>
        </ScreenTemplate>
    )
}

export default Dashboard
