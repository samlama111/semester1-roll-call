import { ApiCall } from 'tsrpc'

import { getAttendanceByClassId } from '../../models/GetAttendanceByClass'
import { ReqGetByClass, ResGetByClass } from '../../shared/protocols/attendance/PtlGetByClass'

export async function ApiGetByClass(call: ApiCall<ReqGetByClass, ResGetByClass>) {
    const attendance = await getAttendanceByClassId(call.req.class_id)

    if (!attendance.value) { 
        if (attendance.errorMessage) call.error(attendance.errorMessage)
        return
    }
    call.succ({
        class_attendance: attendance.value
    })
}
