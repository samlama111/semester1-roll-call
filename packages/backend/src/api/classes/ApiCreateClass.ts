import { ApiCall } from 'tsrpc'

import { createClass } from '../../models/CreateClass'
import { ReqCreateClass, ResCreateClass } from '../../shared/protocols/classes/PtlCreateClass'

export async function ApiCreateClass(call: ApiCall<ReqCreateClass, ResCreateClass>) {    
    const newClass = await createClass(call.req.name)

    if (!newClass.value) { 
        if (newClass.errorMessage) call.error(newClass.errorMessage)
        return
    }
    call.succ({
        class: newClass.value
    })
}
