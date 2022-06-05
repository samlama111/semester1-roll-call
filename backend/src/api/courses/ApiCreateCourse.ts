import { ApiCall } from 'tsrpc'

import { createCourse } from '../../models/CreateCourse'
import { ReqCreateCourse, ResCreateCourse } from '../../shared/protocols/courses/PtlCreateCourse'

export async function ApiCreateCourse(call: ApiCall<ReqCreateCourse, ResCreateCourse>) {
    const newCourse = await createCourse(call.req.name, call.req.class_id, call.req.campus_id, call.currentUserId)

    if (!newCourse.value) { 
        if (newCourse.errorMessage) call.error(newCourse.errorMessage)
        return
    }
    call.succ({
        course: newCourse.value
    })
}
