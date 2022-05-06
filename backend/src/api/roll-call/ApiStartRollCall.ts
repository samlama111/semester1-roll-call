import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqStartRollCall, ResStartRollCall } from "../../shared/protocols/roll-call/PtlStartRollCall";

export async function ApiStartRollCall(call: ApiCall<ReqStartRollCall, ResStartRollCall>) {
    if (!call.req.class_id || !call.req.course_id) {
        call.error('Please provide class_id and course_id')
        return
    }

    const res = await Global.collection('Enrollment').updateOne(
        { 
            course_id: call.req.course_id, class_id: call.req.class_id
        },
        { 
            $set: { 'roll_call_started': true } 
        }
    )

    if(!res.acknowledged) {
        call.error('Role call could not be started')
        return
    }

    call.succ({
        message: 'Role call started'
    })
}