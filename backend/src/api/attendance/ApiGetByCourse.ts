import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetByCourse, ResGetByCourse } from "../../shared/protocols/attendance/PtlGetByCourse";
import { CourseAttendance } from "../../shared/models/CourseAttendance";
import { ObjectId } from "mongodb";
import { DbEnrollment } from "../../shared/db/DbEnrollment";
import { DbStudent } from "../../shared/db/DbStudent";
import { DbCourse } from "../../shared/db/DbCourse";

export async function ApiGetByCourse(call: ApiCall<ReqGetByCourse, ResGetByCourse>) {
    if (!call.req.course_id) {
        call.error('Missing course_id')
        return
    }

    const course = await Global.collection('Course').aggregate([
        {
            $match: { _id: call.req.course_id }
        },
        {
            // TODO: needs to be refactored to student objects
            $lookup: {
                from: "Student",
                localField: "student_ids",
                foreignField: "_id",
                as: "students_full"
            }
        },
    ]).toArray()

    const attendance: Array<CourseAttendance> = course[0]?.enrollments.map((enrollment: DbEnrollment) => {
        const students = course[0].students_full.map((val: DbStudent) => {
            let enrolled = false
            if (enrollment.enrolled_student_ids.find((id) => id === val.uid)) {
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

    call.succ({
        course_name: course[0].name,
        class_name: course[0].class_name,
        attendance,
    })
}
