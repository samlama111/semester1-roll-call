import { ApiCall } from 'tsrpc'

import { listClasses } from '../../models/ListClasses'
import { ReqListClasses, ResListClasses } from '../../shared/protocols/classes/PtlListClasses'

export async function ApiGetClasses(call: ApiCall<ReqListClasses, ResListClasses>) {
    // query db for this teacher's classes
    const classes = await listClasses()

    if (!classes.value) { 
        if (classes.errorMessage) call.error(classes.errorMessage)
        return
    }

    call.succ({
        classes: classes.value,
    })
}
