import axios from 'axios'

import { Location } from '../shared/models/Location'
import { convertStringToInt } from './stringHandler'

export const fetchCoordinatesFromAddress = async (
    address: string,
    errorFunction: (message:string) => Promise<void>
): Promise<Location> => {
    // fetch location from address
    const getLocationFromAddress = await axios.get(`https://geocode.maps.co/search?q=${address}`)
    if (getLocationFromAddress.status !== 200) {
        errorFunction('Failed finding coordinates')
    }
    if (!getLocationFromAddress.data || getLocationFromAddress.data.length < 1) {
        errorFunction('Invalid address')
    }
    const mostAccurateGeolocation = getLocationFromAddress.data[0]
    return {
        lat: convertStringToInt(mostAccurateGeolocation.lat),
        long: convertStringToInt(mostAccurateGeolocation.lon)
    } || undefined  
}
