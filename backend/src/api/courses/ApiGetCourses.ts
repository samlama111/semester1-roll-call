import { ApiCall } from 'tsrpc'

import { getTeacherCourses } from '../../models/GetTeacherCourses'
import { ReqGetCourses, ResGetCourses } from '../../shared/protocols/courses/PtlGetCourses'

export async function ApiGetCourses(call: ApiCall<ReqGetCourses, ResGetCourses>) {
    const courses = await getTeacherCourses(call.currentUserId, call.req.class_id)
    
    if (!courses.value) { 
        if (courses.errorMessage) call.error(courses.errorMessage)
        return
    }
    call.succ({
        courses: courses.value
    })
}
