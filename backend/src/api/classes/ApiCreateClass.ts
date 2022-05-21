import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { insertClass } from '../../db/Class'
import { validateName } from '../../helpers/validator'
import { DbClass } from '../../shared/db/DbClass'
import { ReqCreateClass, ResCreateClass } from '../../shared/protocols/classes/PtlCreateClass'

export async function ApiCreateClass(call: ApiCall<ReqCreateClass, ResCreateClass>) {    
    if (!validateName(call.req.name)) {
        call.error('Class name format is not correct')
    }
    const newClass: DbClass = {
        _id: new ObjectId(),
        name: call.req.name
    }
     
    const res = await insertClass(newClass)

    if (!res.acknowledged) {
        call.error('Create was not successful')
        return
    }

    call.succ({
        class: newClass
    })
}
