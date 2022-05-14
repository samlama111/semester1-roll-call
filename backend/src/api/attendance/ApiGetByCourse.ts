import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetByCourse, ResGetByCourse } from "../../shared/protocols/attendance/PtlGetByCourse";

export async function ApiGetByCourse(call: ApiCall<ReqGetByCourse, ResGetByCourse>) {
    if (!call.req.course_id) {
        call.error('Missing course_id')
        return
    }

    const course = await Global.collection('Course').findOne({
        _id: call.req.course_id
    })
    
    if (!course) {
        call.error('Could not find course')
        return
    }

    const courseAttendance = course.students.map((student) => {
        const studentEnrolled = course.enrollments.map((enrollment) => enrollment.enrolled_student_ids.includes(student.uid))
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
