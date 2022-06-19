import { ApiCall } from 'tsrpc'

import { getTeacherLastActiveRollCall } from '../../models/GetTeacherRollCall'
import { ReqTeacherGetRollCall, ResTeacherGetRollCall } from '../../shared/protocols/roll-call/PtlTeacherGetRollCall'

export async function ApiTeacherGetRollCall(call: ApiCall<ReqTeacherGetRollCall, ResTeacherGetRollCall>) {
    const lastActiveTeacherEnrollment = await getTeacherLastActiveRollCall(call.req.course_id, call.currentUserId)

    if (!lastActiveTeacherEnrollment.value) { 
        if (lastActiveTeacherEnrollment.errorMessage) call.error(lastActiveTeacherEnrollment.errorMessage)
        return
    }
    call.succ({
        enrollment_info: lastActiveTeacherEnrollment.value
    })
}
