import { ApiCall } from 'tsrpc'

import { listTeachers } from '../../models/ListTeachers'
import { ReqListTeachers, ResListTeachers } from '../../shared/protocols/teachers/PtlListTeachers'

export async function ApiListTeachers(call: ApiCall<ReqListTeachers, ResListTeachers>) {
    // query db for this teacher's classes
    const teachers = await listTeachers()

    if (!teachers.value) { 
        if (teachers.errorMessage) call.error(teachers.errorMessage)
        return
    }

    call.succ({
        teachers: teachers.value,
    })
}
