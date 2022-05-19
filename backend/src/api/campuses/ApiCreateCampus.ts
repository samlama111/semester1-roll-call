import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { insertCampus } from '../../db/Campus'
import { fetchCoordinatesFromAddress } from '../../helpers/geocodeAddress'
import { sanitizeString } from '../../helpers/stringHandler'
import { DbCampus } from '../../shared/db/DbCampus'
import { ReqCreateCampus, ResCreateCampus } from '../../shared/protocols/campuses/PtlCreateCampus'

export async function ApiCreateCampus(call: ApiCall<ReqCreateCampus, ResCreateCampus>) {
    if (!call.req.name || !call.req.address) {
        call.error('Please provide correct campus data')
        return
    }

    // fetch location from address
    const locationFromAddress = await fetchCoordinatesFromAddress(sanitizeString(call.req.address), call.error)

    const newCampus: DbCampus = {
        _id: new ObjectId(),
        name: call.req.name,
        location: {
            lat: locationFromAddress.lat,
            long: locationFromAddress.long
        }
    }
     
    const res = await insertCampus(newCampus)

    if (!res.acknowledged) {
        call.error('Campus create was not successful')
        return
    }

    call.succ({
        campus: newCampus
    })
}
