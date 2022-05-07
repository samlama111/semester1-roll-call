import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqEndRollCall, ResEndRollCall } from "../../shared/protocols/roll-call/PtlEndRollCall";
import {ReqEnroll, ResEnroll} from "../../shared/protocols/roll-call/PtlEnroll";

export async function ApiEnroll(call: ApiCall<ReqEnroll, ResEnroll>) {
    if (!call.req.student_id || !call.req.enrollment_id) {
        call.error('Please provide student_id and enrollment_id')
        return
    }

    const res = await Global.collection('Course').updateOne(
        { 
            "enrollments._id": call.req.enrollment_id,
            "enrollments.enrolled_student_ids": { $nin : [call.req.student_id] }
        },
        { "$push": 
            {
                "enrollments.$.enrolled_student_ids": call.req.student_id
            }
        }
    )

    call.logger.log(res)
    if(!res.modifiedCount || !res.matchedCount) {
        call.error('Enrollment failed')
        return
    }

    call.succ({
        message: 'successfully enrolled'
    })

}