import { ApiCall } from 'tsrpc'

import { getMostRecentStudentEnrollment } from '../../db/Course'
import { ReqGetRollCall, ResGetRollCall } from '../../shared/protocols/roll-call/PtlGetRollCall'

export async function ApiGetRollCall(call: ApiCall<ReqGetRollCall, ResGetRollCall>) {
    let studentIsEnrolled = false

    const lastEnrollment = await getMostRecentStudentEnrollment(call.currentUserId)

    if (!lastEnrollment) {
        call.error('No ongoing roll call found')
        return
    }

    // check if student is enrolled
    studentIsEnrolled = !!lastEnrollment.last.enrolled_student_ids
        .some((val: string) => val === call.currentUserId)

    call.succ({
        is_student_enrolled: studentIsEnrolled,
        roll_call_id: lastEnrollment.last._id,
        course_info: {
            name: lastEnrollment.name,
            class_name: lastEnrollment.class_name,
        }
    })
}
