import { ApiCall } from 'tsrpc'

import { createStudent } from '../../models/CreateStudent'
import { ReqCreateStudent, ResCreateStudent } from '../../shared/protocols/students/PtlCreateStudent'

export async function ApiCreateStudent(call: ApiCall<ReqCreateStudent, ResCreateStudent>) {
    const newStudent = await createStudent(call.req.firstname, call.req.lastname, call.req.email, call.currentUserId)

    if (!newStudent.value) { 
        if (newStudent.errorMessage) call.error(newStudent.errorMessage)
        return
    }
    call.succ({
        student: newStudent.value
    })
}
