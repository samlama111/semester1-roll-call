/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import ClassCourseSelect from '../components/ClassSelect'
import ErrorAlert from '../components/ErrorAlert'
import ScreenTemplate from '../components/ScreenTemplate'
import { getClasses } from '../services/classService'
import { getCoursesByClassId } from '../services/courseService'
import { DbClass } from '../shared/db/DbClass'
import { DbCourse } from '../shared/db/DbCourse'

function Dashboard() {
    const navigate = useNavigate()
    const [teacherClasses, setTeacherClasses] = React.useState<DbClass[]>([])
    const [selectedClass, setSelectedClass] = React.useState<string>('')
    const [courses, setCourses] = React.useState<DbCourse[]>([])
    const [selectedCourse, setSelectedCourse] = React.useState<string>('')
    const [errorMessage, setErrorMessage] = React.useState('')

    const [renderClass, setRenderClass] = React.useState(true)
    const [renderCourse, setRenderCourse] = React.useState(false)

    const fetchClasses = async () => {
        const fetchedClasses = await getClasses()
        if (fetchedClasses.isSucc && fetchedClasses.res) {
            setSelectedClass(fetchedClasses.res.classes[0]._id)
            setTeacherClasses(fetchedClasses.res.classes)
        } else if (fetchedClasses.err) setErrorMessage(fetchedClasses.err.message)
        else setErrorMessage('Unexpect error encountered')
    }
    const fetchCourses = async () => {
        const fetchedCourses = await getCoursesByClassId(selectedClass)
        if (fetchedCourses.isSucc && fetchedCourses.res) {
            setSelectedCourse(fetchedCourses.res.courses[0]._id)
            setCourses(fetchedCourses.res.courses)
        } else if (fetchedCourses.err) setErrorMessage(fetchedCourses.err.message)
        else setErrorMessage('Unexpect error encountered')
    }
    const submit = async () => {
        if (renderClass) {
            await fetchCourses()
            setRenderCourse(true)
            setRenderClass(false)
        }
        if (renderCourse) {
            setRenderCourse(false)
            navigate('/rollcall', { state: { courseId: selectedCourse } })
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
                
                <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained" onClick={submit}>
                    {renderClass && 'Submit class'}
                    {renderCourse && 'Submit course'}
                </Button>
            </Grid>
            <ErrorAlert
                open={errorMessage.length > 0}
                setClose={() => setErrorMessage('')}
                text={errorMessage} />
        </ScreenTemplate>
    )
}

export default Dashboard
