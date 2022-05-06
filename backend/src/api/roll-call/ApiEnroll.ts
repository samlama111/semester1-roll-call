import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqEndRollCall, ResEndRollCall } from "../../shared/protocols/roll-call/PtlEndRollCall";
import {ReqEnroll, ResEnroll} from "../../shared/protocols/roll-call/PtlEnroll";

export async function ApiEnroll(call: ApiCall<ReqEnroll, ResEnroll>) {
    if (!call.req.student_id || !call.req.enrollment_id) {
        call.error('Please provide student_id and enrollment_id')
        return
    }

    const res = await Global.collection('Enrollment').updateOne(
        {
            _id: call.req.enrollment_id,
            roll_call_started: true,
            students: { student_id: call.req.student_id, enrolled: false }
        },
        {
            $set: {
                "students.$.enrolled": true
            }
        },
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