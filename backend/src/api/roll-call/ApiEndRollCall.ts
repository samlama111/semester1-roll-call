import { ApiCall } from 'tsrpc'

import { setEnrollmentNotActive } from '../../db/Course'
import { ReqEndRollCall, ResEndRollCall } from '../../shared/protocols/roll-call/PtlEndRollCall'

export async function ApiEndRollCall(call: ApiCall<ReqEndRollCall, ResEndRollCall>) {
    const enrollmentId = call.req.enrollment_id
    if (!enrollmentId) {
        call.error('Please provide enrollment_id')
        return
    }
     
    const course = await setEnrollmentNotActive(enrollmentId)

    if (!course.ok || !course.value) {
        call.error('Role call could not be ended')
        return
    }

    const enrollmentIndex = course.value.enrollments.findIndex((enrollment) => enrollment._id.equals(enrollmentId))
    const endedRollCall = course.value.enrollments[enrollmentIndex]
    call.succ({
        enrollment: endedRollCall
    })
}
