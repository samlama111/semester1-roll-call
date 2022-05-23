import { ApiCall } from 'tsrpc'

import { startRollCall } from '../../models/StartRollCall'
import { ReqStartRollCall, ResStartRollCall } from '../../shared/protocols/roll-call/PtlStartRollCall'

export async function ApiStartRollCall(call: ApiCall<ReqStartRollCall, ResStartRollCall>) {
    const startedRollCall = await startRollCall(call.req.course_id, call.currentUserId)

    if (!startedRollCall.value) { 
        if (startedRollCall.errorMessage) call.error(startedRollCall.errorMessage)
        return
    }
    call.succ({
        roll_call: startedRollCall.value
    })
}
