import { ApiCall } from 'tsrpc'

import { createCampus } from '../../models/CreateCampus'
import { ReqCreateCampus, ResCreateCampus } from '../../shared/protocols/campuses/PtlCreateCampus'

export async function ApiCreateCampus(call: ApiCall<ReqCreateCampus, ResCreateCampus>) {
    const newCampus = await createCampus(call.req.name, call.req.address, call.req.radius)

    if (!newCampus.value) { 
        if (newCampus.errorMessage) call.error(newCampus.errorMessage)
        return
    }
    call.succ({
        campus: newCampus.value
    })
}
