import { ApiCall } from 'tsrpc'

import { getCourseById } from '../../db/Course'
import { ReqGetByCourse, ResGetByCourse } from '../../shared/protocols/attendance/PtlGetByCourse'

export async function ApiGetByCourse(call: ApiCall<ReqGetByCourse, ResGetByCourse>) {
    const course = await getCourseById(call.req.course_id)

    if (!course) {
        call.error('No course found')
        return 
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

    call.succ({
        attendance: { 
            attendance_info: course.enrollments.map((enrollment) => enrollment.date), 
            student_info: courseAttendance,
            course_name: course.name,
            class_name: course.class_name 
        }
    })
}
