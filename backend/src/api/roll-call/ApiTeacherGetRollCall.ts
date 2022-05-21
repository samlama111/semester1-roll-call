import { ApiCall } from 'tsrpc'

import { getMostRecentTeachersCourseEnrollment } from '../../db/Course'
import { validateObjectId } from '../../helpers/validator'
import { ReqTeacherGetRollCall, ResTeacherGetRollCall } from '../../shared/protocols/roll-call/PtlTeacherGetRollCall'

export async function ApiTeacherGetRollCall(call: ApiCall<ReqTeacherGetRollCall, ResTeacherGetRollCall>) {
    if (!validateObjectId(call.req.course_id)) {
        call.error('Use a valid course id')
        return 
    }
    const activeEnrollment = await getMostRecentTeachersCourseEnrollment(call.currentUserId, call.req.course_id)

    if (!activeEnrollment) {
        call.error('No roll-call found')
        return
    }

    call.succ({
        enrollment_info: activeEnrollment.last
    })
}
