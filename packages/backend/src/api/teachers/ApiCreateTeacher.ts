import { ApiCall } from 'tsrpc'

import { createTeacher } from '../../models/CreateTeacher'
import { ReqCreateTeacher, ResCreateTeacher } from '../../shared/protocols/teachers/PtlCreateTeacher'

export async function ApiCreateTeacher(call: ApiCall<ReqCreateTeacher, ResCreateTeacher>) {
    const newTeacher = await createTeacher(call.req.firstname, call.req.lastname, call.req.email, call.currentUserId)

    if (!newTeacher.value) { 
        if (newTeacher.errorMessage) call.error(newTeacher.errorMessage)
        return
    }
    call.succ({
        teacher: newTeacher.value
    })
}
