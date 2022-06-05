import { getDistanceFromLatLonInKm } from '../../../src/helpers/location'

const validLatitude = 89
const validLongitude = 179
const invalidLatitude = 91
const validBoundaryLatitude = 90
const validBoundaryLongitude = 180
const invalidLongitude = 181

describe('Location', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validLatitude, validLongitude, 20, 25, 7883.652],
        [validLatitude, validLongitude, validLatitude, validLongitude, 0],
        [validBoundaryLatitude, validLongitude, 20, 25, 7783.64],
        [validLatitude, validBoundaryLongitude, validLatitude, validBoundaryLongitude, 0],
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
        [-invalidLatitude, validLongitude, 20, 25],
        [validLatitude, invalidLongitude, 20, 25],
        [validLatitude, -invalidLongitude, 20, 25],
        [20, 25, invalidLatitude, validLongitude],
        [20, 25, -invalidLatitude, validLongitude],
        [20, 25, validLatitude, invalidLongitude],
        [20, 25, validLatitude, -invalidLongitude],
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
