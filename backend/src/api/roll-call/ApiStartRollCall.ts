import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { addEnrollmentToCourse } from '../../db/Course'
import { DbEnrollment } from '../../shared/db/DbEnrollment'
import { ReqStartRollCall, ResStartRollCall } from '../../shared/protocols/roll-call/PtlStartRollCall'

export async function ApiStartRollCall(call: ApiCall<ReqStartRollCall, ResStartRollCall>) {
    if (!call.req.course_id) {
        call.error('Please provide and course_id')
        return
    }

    const newEnrollment: DbEnrollment = {
        _id: new ObjectId(),
        date: new Date().toISOString(),
        roll_call_started: true,
        enrolled_student_ids: [],
    }

    const res = await addEnrollmentToCourse(call.req.course_id, newEnrollment)

    if (!res.acknowledged && res.modifiedCount < 1) {
        call.error('Role call could not be started')
        return
    }

    call.succ({
        roll_call: newEnrollment
    })
}
