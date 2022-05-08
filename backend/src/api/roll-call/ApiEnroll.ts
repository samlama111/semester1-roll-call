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
        },
        { "$addToSet": 
            {
                "enrollments.$.enrolled_student_ids": call.req.student_id
            }
        }
    )

    if(!res.matchedCount) {
        call.error('Failed to find the enrollment')
        return
    }
    if(!res.modifiedCount) {
        call.error('You are already enrolled')
        return
    }

    call.succ({
        message: 'successfully enrolled'
    })

}