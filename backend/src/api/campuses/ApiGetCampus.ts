import { ApiCall } from 'tsrpc'

import { getCampus } from '../../models/GetCampus'
import { ReqGetCampus, ResGetCampus } from '../../shared/protocols/campuses/PtlGetCampus'

export async function ApiGetCampus(call: ApiCall<ReqGetCampus, ResGetCampus>) {
    const campus = await getCampus(call.req.campus_id)

    if (!campus.value) { 
        if (campus.errorMessage) call.error(campus.errorMessage)
        return
    }
    call.succ({
        campus: campus.value
    })
}
