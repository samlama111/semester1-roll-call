import { ApiCall } from 'tsrpc'

import { listStudents } from '../../models/ListStudents'
import { ReqListStudents, ResListStudents } from '../../shared/protocols/students/PtlListStudents'

export async function ApiListStudents(call: ApiCall<ReqListStudents, ResListStudents>) {
    // query db for this teacher's classes
    const students = await listStudents()

    if (!students.value) { 
        if (students.errorMessage) call.error(students.errorMessage)
        return
    }

    call.succ({
        students: students.value,
    })
}
