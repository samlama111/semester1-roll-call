import { ObjectId } from 'mongodb'

import { getCourseById } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { CourseAttendance } from '../shared/models/CourseAttendance'
import { ModelReturnType } from './ModelReturnType'

export const getAttendanceByCourseId = async (courseId: ObjectId):
  Promise<ModelReturnType<CourseAttendance | undefined>> => {
    if (!validateObjectId(courseId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid course id'
        }
    }
    const course = await getCourseById(courseId)

    if (!course) {
        return {
            value: undefined,
            errorMessage: 'No course found'
        }
    } 

    // get array of students and whether they've enrolled as an array of booleans 
    const courseAttendance = course.students.map((student) => {
        const studentEnrolled = course.enrollments.map(
            (enrollment) => enrollment.enrolled_student_ids.includes(student.uid)
        )
        return {
            student,
            enrolled: studentEnrolled
        }
    })
    return {
        value: {
            attendance_info: course.enrollments.map((enrollment) => enrollment.date), 
            student_info: courseAttendance,
            course_name: course.name,
            class_name: course.class_name 
        }
    }
}
