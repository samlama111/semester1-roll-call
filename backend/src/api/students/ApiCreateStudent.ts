import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { createStudent } from '../../db/Student'
import { isEmailValid } from '../../helpers/validator'
import { DbStudent } from '../../shared/db/DbStudent'
import { ReqCreateStudent, ResCreateStudent } from '../../shared/protocols/students/PtlCreateStudent'

export async function ApiCreateStudent(call: ApiCall<ReqCreateStudent, ResCreateStudent>) {
    // TODO: handle name format (only letters) + length

    if (!isEmailValid(call.req.email)) {
        call.error('Invalid email used')
        return
    }
    
    const newStudent: DbStudent = {
        _id: new ObjectId(),
        uid: call.currentUserId as string,
        firstname: call.req.firstname,
        lastname: call.req.lastname,
        email: call.req.email
    }
     
    const res = await createStudent(newStudent)

    if (!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        student: newStudent
    })
}
