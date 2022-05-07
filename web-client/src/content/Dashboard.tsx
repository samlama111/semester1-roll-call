/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

import ClassCourseSelect from '../components/ClassSelect'
import DropdownRollCallDuration from '../components/DropdownRollCallDuration'
import ScreenTemplate from '../components/ScreenTemplate'
import { getClasses } from '../services/classService'
import { getCoursesByClassId } from '../services/courseService'
import { startRollCall } from '../services/rollCallService'
import { DbClass } from '../shared/db/DbClass'
import { DbCourse } from '../shared/db/DbCourse'

const currentTeacherId = '627413d48f24d2c629f5694f'
function Dashboard() {
    const [teacherClasses, setTeacherClasses] = React.useState<DbClass[]>([])
    const [selectedClass, setSelectedClass] = React.useState<string>('')
    const [courses, setCourses] = React.useState<DbCourse[]>([])
    const [selectedCourse, setSelectedCourse] = React.useState<string>('')

    const [renderClass, setRenderClass] = React.useState(true)
    const [renderCourse, setRenderCourse] = React.useState(false)
    const [renderStart, setRenderStart] = React.useState(false)
    // TODO: Sebrat lesson z DB
    // TODO: Check if the current lesson has roll-call going on, display the appropriate <div>
    const fetchClasses = async () => {
        const fetchedClasses = await getClasses(currentTeacherId)
        if (fetchedClasses.isSucc && fetchedClasses.res) {
            setSelectedClass(fetchedClasses.res.classes[0]._id)
            setTeacherClasses(fetchedClasses.res.classes)
        }
    }
    const fetchCourses = async () => {
        const fetchedCourses = await getCoursesByClassId(currentTeacherId, selectedClass)
        if (fetchedCourses.isSucc && fetchedCourses.res) {
            setSelectedCourse(fetchedCourses.res.courses[0]._id)
            setCourses(fetchedCourses.res.courses)
        }
    }
    const submit = async () => {
        if (renderClass) {
            await fetchCourses()
            setRenderCourse(true)
            setRenderClass(false)
        }
        if (renderCourse) {
            setRenderStart(true)
            setRenderCourse(false)
        }
        if (renderStart) {
            await startRollCall(selectedCourse)
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
                        <ClassCourseSelect
                            helperText="Select class to Roll call"
                            items={teacherClasses}
                            selectedItemId={selectedClass}
                            setSelectedItemId={setSelectedClass} />
                    </Grid>
                )}
                {renderCourse && (
                    <Grid item>
                        <Typography variant="h5">Select course</Typography>
                        <ClassCourseSelect
                            helperText="Select course from previously selected class"
                            items={courses}
                            selectedItemId={selectedCourse}
                            setSelectedItemId={setSelectedCourse} />
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
                    {renderCourse && 'Submit course'}
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
