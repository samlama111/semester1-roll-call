import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqEndRollCall, ResEndRollCall } from "../../shared/protocols/roll-call/PtlEndRollCall";

export async function ApiEndRollCall(call: ApiCall<ReqEndRollCall, ResEndRollCall>) {
    if (!call.req.student_id || !call.req.enrollment_id) {
        call.error('Please provide class_id and course_id')
        return
    }
    
    const res = await Global.collection('Enrollment').findOneAndUpdate(
        { 
            course_id: call.req.enrollment_id, class_id: call.req.student_id
        },
        { 
            $set: { 'roll_call_started': false }
        },
        {
            returnDocument: 'after'
        }
    )

    if(!res.ok || !res.value) {
        call.error('Role call could not be started')
        return
    }

    call.succ({
        enrollment: res.value
    })

}