import { ApiCall } from 'tsrpc'

import { endRollCall } from '../../models/EndRollCall'
import { ReqEndRollCall, ResEndRollCall } from '../../shared/protocols/roll-call/PtlEndRollCall'

export async function ApiEndRollCall(call: ApiCall<ReqEndRollCall, ResEndRollCall>) {
    const endedRollCall = await endRollCall(call.req.enrollment_id)

    if (!endedRollCall.value) { 
        if (endedRollCall.errorMessage) call.error(endedRollCall.errorMessage)
        return
    }
    call.succ({
        enrollment: endedRollCall.value
    })
}
