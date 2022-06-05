import { ObjectId } from 'mongodb'

import { insertCampus } from '../db/Campus'
import { fetchCoordinatesFromAddress } from '../helpers/location'
import { sanitizeString } from '../helpers/stringHandler'
import { validateLongNameLength, validateNameLength } from '../helpers/validator'
import { DbCampus } from '../shared/db/DbCampus'
import { ModelReturnType } from './ModelReturnType'

export const createCampus = async (name: string, address: string, radius: number):
  Promise<ModelReturnType<DbCampus | undefined>> => {
    const addressInput = sanitizeString(address)
    if (!validateLongNameLength(addressInput)) {
        return {
            value: undefined,
            errorMessage: 'Invalid address length'
        }
    }
    const nameInput = sanitizeString(name)
    if (!validateNameLength(name)) {
        return {
            value: undefined,
            errorMessage: 'Invalid campus name length'
        }
    }

    // fetch location from address
    const locationFromAddress = await fetchCoordinatesFromAddress(addressInput)

    if (!locationFromAddress?.value) {
        return {
            value: undefined,
            errorMessage: locationFromAddress.errorMessage
        }
    }
    const newCampus: DbCampus = {
        _id: new ObjectId(),
        name: nameInput,
        location: {
            lat: locationFromAddress.value.lat,
            long: locationFromAddress.value.long
        },
        radius
    }
     
    const res = await insertCampus(newCampus)

    if (!res.acknowledged) {
        return {
            value: undefined,
            errorMessage: 'Campus creation was not successful'
        }
    }

    return {
        value: newCampus
    }
}
