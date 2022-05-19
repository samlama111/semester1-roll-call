import axios from 'axios'

import { Location } from '../shared/models/Location'
import { convertStringToInt } from './stringHandler'

export const fetchCoordinatesFromAddress = async (
    address: string,
    errorFunction: (message:string) => void
): Promise<Location | undefined> => {
    // fetch location from address
    const getLocationFromAddress = await axios.get(`https://geocode.maps.co/search?q=${address}`)
    if (getLocationFromAddress.status !== 200) {
        errorFunction('Failed finding coordinates')
        return undefined
    }
    if (!getLocationFromAddress.data || getLocationFromAddress.data.length < 1) {
        errorFunction('Invalid address')
        return undefined
    }
    const mostAccurateGeolocation = getLocationFromAddress.data[0]
    // TODO: validate lat & long are valid
    return {
        lat: convertStringToInt(mostAccurateGeolocation.lat),
        long: convertStringToInt(mostAccurateGeolocation.lon)
    }
}
