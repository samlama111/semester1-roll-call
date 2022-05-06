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
            enrollment_id: call.req.enrollment_id, roll_call_started: true
        },
        {$set:{
                "students.$[student].enrolled": true
            }}, {
            "arrayFilters": [
                {"student.student_id" : call.req.student_id}
            ]
        }
    )

    if(!res.acknowledged) {
        call.error('Enrollment failed')
        return
    }

    call.succ({
        message: 'successfully enrolled'
    })

}