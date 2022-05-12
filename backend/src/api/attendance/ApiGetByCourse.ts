import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetByCourse, ResGetByCourse } from "../../shared/protocols/attendance/PtlGetByCourse";
import { CourseAttendance } from "../../shared/models/CourseAttendance";
import { DbEnrollment } from "../../shared/db/DbEnrollment";
import { DbStudent } from "../../shared/db/DbStudent";

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

    const attendance: Array<CourseAttendance> = course?.enrollments.map((enrollment: DbEnrollment, index: number) => {
        const students = course.students.map((val: DbStudent, index: number) => {
            let enrolled = false
            if (enrollment.enrolled_student_ids.find((id, index) => id.equals(val._id))) {
                enrolled = true
            }
            return { student: val, enrolled }
        })
        const returnval: CourseAttendance = {
            date: enrollment.date,
            students
        }
        return returnval
    })

    call.logger.log(attendance)

    call.succ({
        course_name: course.name,
        class_name: course.class_name,
        attendance,
    })
}
