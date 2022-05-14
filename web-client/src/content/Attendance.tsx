/* eslint-disable no-underscore-dangle */
import { ArrowBack } from '@mui/icons-material'
import {
    Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography 
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

function Attendance() {
    const [teacherClasses, setTeacherClasses] = React.useState<DbClass[]>([])
    const [courses, setCourses] = React.useState<DbCourse[]>([])
    const [courseAttendance, setCourseAttendance] = React.useState<CourseAttendance>()
    
    const [selectedClass, setSelectedClass] = React.useState<string>('')
    const [selectedCourse, setSelectedCourse] = React.useState<string>('')

    const [renderClass, setRenderClass] = React.useState(true)
    const [renderCourse, setRenderCourse] = React.useState(false)
    const [renderAttendance, setRenderAttendance] = React.useState(false)

    const fetchClasses = async () => {
        const fetchedClasses = await getClasses()
        if (fetchedClasses.isSucc && fetchedClasses.res.classes.length > 0) {
            setTeacherClasses(fetchedClasses.res.classes)
            setSelectedClass(fetchedClasses.res.classes[0]._id)
        }
    }
    const fetchCourses = async () => {
        const fetchedCourses = await getCoursesByClassId(selectedClass)
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
    const goBack = () => {
        setRenderClass(true)
        setRenderAttendance(false)
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
                ) : (
                    <TableContainer style={{ maxWidth: '90%', margin: '0 auto' }} component={Paper}>
                        <Button 
                            onClick={goBack}
                            variant="contained"
                            style={{ marginRight: 'auto', marginTop: '2vh' }}
                            endIcon={<ArrowBack />}>
                            Back
                        </Button>
                        <Typography align="center" variant="h5">
                            {courseAttendance?.class_name}, {courseAttendance?.course_name}
                        </Typography>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    {courseAttendance?.attendance_info.map((date) => (
                                        <TableCell key={date}>{new Date(date).toLocaleDateString()}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courseAttendance?.student_info.map((el) => (
                                    <TableRow
                                        key={el.student._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {el.student.firstname} {el.student.lastname}
                                        </TableCell>
                                        {el.enrolled.map((isEnrolled, index) => (
                                            <TableCell 
                                                key={courseAttendance.attendance_info[index]}>
                                                {(isEnrolled) ? ' ✔️' : ' ❌'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Grid>
        </ScreenTemplate>
    )
}

export default Attendance
