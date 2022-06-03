import { getDistanceFromLatLonInKm } from '../../../src/helpers/location'

describe('Location', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [10, 15, 20, 25, 1544.755]
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
        // invalid latitude
        [91, 15, 20, 25]
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
