import axios from 'axios'

import { ModelReturnType } from '../models/ModelReturnType'
import { Location } from '../shared/models/Location'
import { convertStringToInt } from './stringHandler'
import { isLatitudeValid, isLongitudeValid } from './validator'

export const fetchCoordinatesFromAddress = async (
    address: string
): Promise<ModelReturnType<Location | undefined>> => {
    // fetch location from address
    const getLocationFromAddress = await axios.get(`https://geocode.maps.co/search?q=${address}`)
    if (getLocationFromAddress.status !== 200) {
        return {
            value: undefined,
            errorMessage: 'Failed finding coordinates'
        }
    }
    if (!getLocationFromAddress.data || getLocationFromAddress.data.length < 1) {
        return {
            value: undefined,
            errorMessage: 'Invalid address'
        }
    }
    const mostAccurateGeolocation = getLocationFromAddress.data[0]
    const convertedLatitude = convertStringToInt(mostAccurateGeolocation.lat)
    const convertedLongitude = convertStringToInt(mostAccurateGeolocation.lon)

    if (convertedLatitude && !isLatitudeValid(convertedLatitude)) {
        return {
            value: undefined,
            errorMessage: 'Invalid latitude'
        }
    }
    if (convertedLongitude && !isLongitudeValid(convertedLongitude)) {
        return {
            value: undefined,
            errorMessage: 'Invalid longitude'
        }
    }
    if (convertedLatitude && convertedLongitude) {
        return {
            value: {
                lat: convertedLatitude,
                long: convertedLongitude
            }
        } 
    }
    return { value: undefined }
}
