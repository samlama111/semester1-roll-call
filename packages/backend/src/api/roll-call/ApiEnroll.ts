import { ApiCall } from 'tsrpc'

import { enroll } from '../../models/EnrollStudent'
import { ReqEnroll, ResEnroll } from '../../shared/protocols/roll-call/PtlEnroll'

export async function ApiEnroll(call: ApiCall<ReqEnroll, ResEnroll>) {
    const successfullyEnrolled = await enroll(call.req.enrollment_id, call.req.location, call.currentUserId)

    if (!successfullyEnrolled.value && successfullyEnrolled.errorMessage) {
        call.error(successfullyEnrolled.errorMessage)
        return
    }
    call.succ({
        message: 'successfully enrolled'
    })
}
