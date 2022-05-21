import { ApiCall } from 'tsrpc'

import { getAttendanceByCourseId } from '../../models/GetAttendanceByCourse'
import { ReqGetByCourse, ResGetByCourse } from '../../shared/protocols/attendance/PtlGetByCourse'

export async function ApiGetByCourse(call: ApiCall<ReqGetByCourse, ResGetByCourse>) {
    const attendance = await getAttendanceByCourseId(call.req.course_id)

    if (!attendance.value) { 
        if (attendance.errorMessage) call.error(attendance.errorMessage)
        return
    }
    call.succ({
        attendance: attendance.value
    })
}
