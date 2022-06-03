import { getDistanceFromLatLonInKm } from '../../../src/helpers/location'

const validLatitude = 10
const validLongitude = 15
const invalidLatitude = 91
const invalidLongitude = 181

describe('Location', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validLatitude, validLongitude, 20, 25, 1544.755],
        [validLatitude, validLongitude, validLatitude, validLongitude, 0],
    ])('should return a valid distance between coordinates', async (
        latitude1, 
        longitude1, 
        latitude2, 
        longitude2,
        distance
    ) => {
        const expectedLocation = getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2)
        expect(expectedLocation).toBeCloseTo(distance)
    })

    it.each([
        [invalidLatitude, validLongitude, 20, 25],
        [validLatitude, invalidLongitude, 20, 25],
        [validLatitude, invalidLongitude, 20, invalidLongitude],
        [validLatitude, invalidLongitude, invalidLatitude, invalidLongitude],
    ])('should return an undefined distance between coordinates', async (
        latitude1, 
        longitude1, 
        latitude2, 
        longitude2
    ) => {
        const expectedLocation = getDistanceFromLatLonInKm(latitude1, longitude1, latitude2, longitude2)
        expect(expectedLocation).toEqual(undefined)
    })
})
