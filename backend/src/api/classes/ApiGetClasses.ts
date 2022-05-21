import { ApiCall } from 'tsrpc'

import { getTeacherClasses } from '../../models/GetTeacherClasses'
import { ReqGetClasses, ResGetClasses } from '../../shared/protocols/classes/PtlGetClasses'

export async function ApiGetClasses(call: ApiCall<ReqGetClasses, ResGetClasses>) {
    // query db for this teacher's classes
    const courses = await getTeacherClasses(call.currentUserId)

    if (!courses.value) { 
        if (courses.errorMessage) call.error(courses.errorMessage)
        return
    }

    call.succ({
        classes: courses.value,
    })
}
