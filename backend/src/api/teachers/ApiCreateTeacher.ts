import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { createTeacher } from '../../db/Teacher'
import { isEmailValid, validateStringName } from '../../helpers/validator'
import { DbTeacher } from '../../shared/db/DbTeacher'
import { ReqCreateTeacher, ResCreateTeacher } from '../../shared/protocols/teachers/PtlCreateTeacher'

export async function ApiCreateTeacher(call: ApiCall<ReqCreateTeacher, ResCreateTeacher>) {
    if (!validateStringName(call.req.firstname) && !validateStringName(call.req.lastname)) {
        call.error('Invalid name')
        return
    }
    if (!isEmailValid(call.req.email)) {
        call.error('Invalid email used')
        return
    }

    const newTeacher: DbTeacher = {
        _id: new ObjectId(),
        uid: call.currentUserId as string,
        firstname: call.req.firstname,
        lastname: call.req.lastname,
        email: call.req.email
    }
     
    const res = await createTeacher(newTeacher)

    if (!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        teacher: newTeacher
    })
}
