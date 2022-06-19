import { ApiCall } from 'tsrpc'

import { getStudentRollCall } from '../../models/GetStudentRollCall'
import { ReqGetRollCall, ResGetRollCall } from '../../shared/protocols/roll-call/PtlGetRollCall'

export async function ApiGetRollCall(call: ApiCall<ReqGetRollCall, ResGetRollCall>) {
    const mostRecentStudentRollCall = await getStudentRollCall(call.currentUserId)

    if (!mostRecentStudentRollCall.value) { 
        if (mostRecentStudentRollCall.errorMessage) call.error(mostRecentStudentRollCall.errorMessage)
        return
    }
    call.succ({
        is_student_enrolled: mostRecentStudentRollCall.value?.is_student_enrolled,
        roll_call_id: mostRecentStudentRollCall.value?.roll_call_id,
        course_info: mostRecentStudentRollCall.value?.course_info
    })
}
