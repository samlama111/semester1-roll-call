import { ObjectId } from 'mongodb'

import { getCoursesByClassId } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { CourseAttendance } from '../shared/models/CourseAttendance'
import { ModelReturnType } from './ModelReturnType'

export const getAttendanceByClassId = async (classId: ObjectId):
  Promise<ModelReturnType<CourseAttendance[] | undefined>> => {
    if (!validateObjectId(classId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid class id'
        }
    }
    const courses = await getCoursesByClassId(classId)

    if (!courses.value) {
        return {
            value: undefined,
            errorMessage: courses.errorMessage
        }
    } 

    // get array of students and whether they've enrolled as an array of booleans 
    const classAttendance = courses.value.map((course): CourseAttendance => {
        const attendanceInfo = course.students.map((student) => {
            const studentEnrolled = course.enrollments.map(
                (enrollment) => enrollment.enrolled_student_ids.includes(student.uid)
            )
            return {
                student,
                enrolled: studentEnrolled
            }
        })
        return {
            attendance_info: course.enrollments.map((enrollment) => enrollment.date),
            student_info: attendanceInfo,
            course_name: course.name,
            class_name: course.class_name
        }
    })
    return {
        value: classAttendance
    }
}
