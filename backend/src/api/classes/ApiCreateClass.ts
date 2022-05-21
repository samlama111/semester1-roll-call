import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { insertClass } from '../../db/Class'
import { DbClass } from '../../shared/db/DbClass'
import { ReqCreateClass, ResCreateClass } from '../../shared/protocols/classes/PtlCreateClass'

export async function ApiCreateClass(call: ApiCall<ReqCreateClass, ResCreateClass>) {    
    // TODO: should we validate name here? can contain anything
    // maybe check whether only ASCII is used
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
