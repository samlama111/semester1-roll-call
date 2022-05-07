import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqEndRollCall, ResEndRollCall } from "../../shared/protocols/roll-call/PtlEndRollCall";

export async function ApiEndRollCall(call: ApiCall<ReqEndRollCall, ResEndRollCall>) {
    if (!call.req.enrollment_id) {
        call.error('Please provide enrollment_id')
        return
    }
     
    const res = await Global.collection('Course').findOneAndUpdate(
        { "enrollments._id": call.req.enrollment_id },
        { 
            "$set": { "enrollments.$.roll_call_started": false }
        }
    )

    if(!res.ok || !res.value) {
        call.error('Role call could not be started')
        return
    }

    const enrollmentIndex = res.value.enrollments.findIndex((enrollment) => enrollment._id.equals(call.req.enrollment_id))
    call.succ({
        enrollment: res.value.enrollments[enrollmentIndex]
    })
}