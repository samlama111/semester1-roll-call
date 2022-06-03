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

export function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    if (!isLatitudeValid(lat1) || !isLatitudeValid(lat2)) return undefined
    if (!isLongitudeValid(lon1) || !isLongitudeValid(lon2)) return undefined
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1) // deg2rad below
    const dLon = deg2rad(lon2 - lon1)
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) 
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
}

export default { getDistanceFromLatLonInKm, fetchCoordinatesFromAddress }
