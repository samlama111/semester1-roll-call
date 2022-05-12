import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetRollCall, ResGetRollCall } from "../../shared/protocols/roll-call/PtlGetRollCall";

export async function ApiGetRollCall(call: ApiCall<ReqGetRollCall, ResGetRollCall>) {
    let studentIsEnrolled = false

    if (!call.req.student_id) {
        call.error('Please provide student_id')
        return
    }

    const roll_call = await Global.collection('Course').aggregate(
        [
            {
                $match: { student_ids: call.req.student_id,  },
            },
            { $addFields: { last: { $last: "$enrollments" } } },
            { $match: { "last.roll_call_started": true } }
        ]
    ).toArray()

    if(!roll_call || roll_call.length <= 0) {
        call.error('No ongoing roll call found')
        return
    }

    studentIsEnrolled = !!roll_call[0].last.enrolled_student_ids
        .some((val: ObjectId) => val.toString() === call.req.student_id.toString())

    call.succ({
        is_student_enrolled: studentIsEnrolled,
        roll_call_id: roll_call[0].last._id,
        course_info: {
            name: roll_call[0].name,
            class_name: roll_call[0].class_name,
        }
    })
}