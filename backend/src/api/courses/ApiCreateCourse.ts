import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { getClassById } from '../../db/Class'
import { createCourse } from '../../db/Course'
import { DbCourse } from '../../shared/db/DbCourse'
import { ReqCreateCourse, ResCreateCourse } from '../../shared/protocols/courses/PtlCreateCourse'

export async function ApiCreateCourse(call: ApiCall<ReqCreateCourse, ResCreateCourse>) {
    // TODO: validate teacher_id is a valid uid

    const classInfo = await getClassById(call.req.class_id)

    if (!classInfo) {
        call.error('Class does not exist')
        return
    }

    const newCourse: DbCourse = {
        _id: new ObjectId(),
        name: call.req.name,
        teacher_id: call.req.teacher_id,
        campus_id: call.req.campus_id,
        class_id: call.req.class_id,
        enrollments: [],
        students: [],
        class_name: classInfo?.name as string
    }
     
    const res = await createCourse(newCourse)

    if (!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        course: newCourse
    })
}
