/* eslint-disable no-underscore-dangle */
import {
    Button, Grid, List, ListItem, Typography 
} from '@mui/material'
import React from 'react'

import ClassCourseSelect from '../components/ClassSelect'
import ScreenTemplate from '../components/ScreenTemplate'
import { getAttendanceByCourse } from '../services/attendanceService'
import { getClasses } from '../services/classService'
import { getCoursesByClassId } from '../services/courseService'
import { DbClass } from '../shared/db/DbClass'
import { DbCourse } from '../shared/db/DbCourse'
import { CourseAttendance } from '../shared/models/CourseAttendance'

const currentTeacherId = '627413d48f24d2c629f5694f'
function Attendance() {
    const [teacherClasses, setTeacherClasses] = React.useState<DbClass[]>([])
    const [courses, setCourses] = React.useState<DbCourse[]>([])
    const [courseAttendance, setCourseAttendance] = React.useState<CourseAttendance[]>([])
    
    const [selectedClass, setSelectedClass] = React.useState<string>('')
    const [selectedCourse, setSelectedCourse] = React.useState<string>('')

    const [renderClass, setRenderClass] = React.useState(true)
    const [renderCourse, setRenderCourse] = React.useState(false)
    const [renderAttendance, setRenderAttendance] = React.useState(false)

    const fetchClasses = async () => {
        const fetchedClasses = await getClasses(currentTeacherId)
        if (fetchedClasses.isSucc && fetchedClasses.res) {
            setTeacherClasses(fetchedClasses.res.classes)
        }
    }
    const fetchCourses = async () => {
        const fetchedCourses = await getCoursesByClassId(currentTeacherId, selectedClass)
        if (fetchedCourses.isSucc && fetchedCourses.res) {
            // eslint-disable-next-line no-underscore-dangle
            setSelectedCourse(fetchedCourses.res.courses[0]._id)
            setCourses(fetchedCourses.res.courses)
        }
    }
    const fetchAttendance = async () => {
        const fetchedAttendance = await getAttendanceByCourse(selectedCourse)
        if (fetchedAttendance.isSucc && fetchedAttendance.res) {
            setCourseAttendance(fetchedAttendance.res.attendance)
        }
    }
    const submit = async () => {
        if (renderClass) {
            await fetchCourses()
            setRenderCourse(true)
            setRenderClass(false)
        }
        if (renderCourse) {
            await fetchAttendance()
            setRenderCourse(false)
            setRenderAttendance(true)
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
                {!renderAttendance ? (
                    <Button style={{ maxWidth: '50%', margin: '0 auto' }} variant="contained" onClick={submit}>
                        {renderClass && 'Submit class'}
                        {renderCourse && 'Submit course'}
                        
                    </Button>
                ) : <Button>Back btn</Button>}
                {renderAttendance && (
                    <Grid item>
                        {courseAttendance.map((att) => (
                            <List key={att.date}>
                                <Typography>{att.date}</Typography>
                                {att.students.map((el) => (
                                    <ListItem key={el.student._id}>
                                        <Typography>{el.student.firstname}</Typography>
                                        <Typography>{(el.enrolled) ? ' ✔️' : ' ❌'}</Typography>
                                    </ListItem>
                                ))}  
                            </List>
                        ))}
                        
                    </Grid>
                )}
            </Grid>
        </ScreenTemplate>
    )
}

export default Attendance
