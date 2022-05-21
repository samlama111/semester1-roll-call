import axios from 'axios'

import { Location } from '../shared/models/Location'
import { convertStringToInt } from './stringHandler'
import { isLatitudeValid, isLongitudeValid } from './validator'

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
    const convertedLatitude = convertStringToInt(mostAccurateGeolocation.lat)
    const convertedLongitude = convertStringToInt(mostAccurateGeolocation.lon)

    if (convertedLatitude && !isLatitudeValid(convertedLatitude)) {
        errorFunction('Invalid latitude')
        return undefined
    }
    if (convertedLongitude && !isLongitudeValid(convertedLongitude)) {
        errorFunction('Invalid longitude')
        return undefined
    }
    if (convertedLatitude && convertedLongitude) {
        return {
            lat: convertedLatitude,
            long: convertedLongitude
        } 
    }
    return undefined
}
