import { ObjectId } from "mongodb";
import { ApiCall } from "tsrpc";
import { insertCampus } from "../../db/Campus";
import { DbCampus } from "../../shared/db/DbCampus";
import { ReqCreateCampus, ResCreateCampus } from "../../shared/protocols/campuses/PtlCreateCampus";
import axios from 'axios'

export async function ApiCreateCampus(call: ApiCall<ReqCreateCampus, ResCreateCampus>) {
    if (!call.req.name || !call.req.address) {
        call.error('Please provide correct campus data')
        return
    }

    // fetch location from address
    const getLocationFromAddress = await axios.get(`https://geocode.maps.co/search?q=${call.req.address}`)
    console.log(getLocationFromAddress.data)

    if (getLocationFromAddress.status !== 200) {
        call.error('Invalid address')
        return
    }
    const newCampus: DbCampus = {
        _id: new ObjectId(),
        name: call.req.name,
        location: {
            // + converts string to number, removes trailing 0s & returns NaN if non-digits are part of string
            latitude: +(getLocationFromAddress.data[0].lat),
            longitude: +(getLocationFromAddress.data[0].lon)
        }
    }
     
    const res = await insertCampus(newCampus)

    if(!res.acknowledged) {
        call.error('Campus create was not successful')
        return
    }

    call.succ({
        campus: newCampus
    })
}