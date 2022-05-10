import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetByCourse, ResGetByCourse } from "../../shared/protocols/attendance/PtlGetByCourse";
import { CourseAttendance } from "../../shared/models/CourseAttendance";
import { ObjectId } from "mongodb";
import { DbEnrollment } from "../../shared/db/DbEnrollment";
import { DbStudent } from "../../shared/db/DbStudent";

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
            $lookup: {
                from: "Student",
                localField: "student_ids",
                foreignField: "_id",
                as: "students_full"
            }
        },
        {
            $addFields: {
                "students_full.enrolled": false
            }
        }
    ]).toArray()

    const x: Array<CourseAttendance> = course[0]?.enrollments.map((enrollment: DbEnrollment, index: number) => {
        const students = course[0].students_full.map((val: any, index: number) => {
            if (enrollment.enrolled_student_ids.find((id, index) => id.equals(val._id))) {
                val.enrolled = true
            }
            return val
        })
        const returnval: CourseAttendance = {
            date: new Date(),
            students
        }
        return returnval
    })

    call.succ({
        attendance: x
    })
}
