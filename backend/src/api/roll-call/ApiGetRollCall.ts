import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { ReqGetRollCall, ResGetRollCall } from "../../shared/protocols/roll-call/PtlGetRollCall";

export async function ApiGetRollCall(call: ApiCall<ReqGetRollCall, ResGetRollCall>) {
    if (!call.req.student_id) {
        call.error('Please provide student_id')
        return
    }

    const roll_call = await Global.collection('Enrollment').findOne(
        {
            roll_call_started: true, students: { student_id: call.req.student_id, enrolled: false }
        }, { projection: { _id: 1 } }
    )

    if(!roll_call) {
        call.error('No ongoing roll call found')
        return
    }

    call.succ({
        roll_call_id: roll_call._id,
    })
}