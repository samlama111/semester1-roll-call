import { fetchCoordinatesFromAddress } from '../../../src/helpers/location'
import { invalidData, validData, validLocation } from '../../__mocks__/geolocationMockData'

const axios = require('axios')

jest.mock('axios')

const validAddress = 'random a'
const invalidAddress = 'wrong'

describe('Geolocation', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validAddress, validLocation, 200, validData]
    ])('should return a valid latitude and longitude object', async (
        address, 
        locationObject, 
        statusCode, 
        receivedData
    ) => {
        axios.get.mockResolvedValue({
            status: statusCode,
            data: receivedData
        })
          
        const expectedLocation = await fetchCoordinatesFromAddress(address)
        
        expect(expectedLocation.value).toEqual(locationObject)
        expect(statusCode).toEqual(200)
        expect(expectedLocation.errorMessage).toEqual(undefined)
    })

    it.each([
        // wrong status code
        [validAddress, validLocation, 201, validData],
        [invalidAddress, validLocation, 201, validData],
        [invalidAddress, validLocation, 400, invalidData],
    ])(
        'should return undefined because of an unsuccessful request',
        async (address, locationObject, statusCode, receivedData) => {
            axios.get.mockResolvedValue({
                status: statusCode,
                data: receivedData
            })
          
            const expectedLocation = await fetchCoordinatesFromAddress(address)
        
            expect(expectedLocation.value).toEqual(undefined)
            expect(statusCode).not.toEqual(200)
            expect(expectedLocation.errorMessage).toEqual('Failed finding coordinates')
        }
    )

    it.each([
        // address not found
        [invalidAddress, validLocation, 200, []],
    ])(
        'should return undefined because of address not found',
        async (address, locationObject, statusCode, receivedData) => {
            axios.get.mockResolvedValue({
                status: statusCode,
                data: receivedData
            })
          
            const expectedLocation = await fetchCoordinatesFromAddress(address)
        
            expect(expectedLocation.value).toEqual(undefined)
            expect(statusCode).toEqual(200)
            expect(expectedLocation.errorMessage).toEqual('Invalid address')
        }
    )

    it.each([
        // invalid lat
        [invalidAddress, 200, invalidData, '91', '179'],
        [invalidAddress, 200, invalidData, '-91', '179'],
        // invalid lon
        [invalidAddress, 200, invalidData, '89', '181'],
        [invalidAddress, 200, invalidData, '89', '-181'],
    ])(
        'should return undefined because of invalid coordinates fetched',
        async (address, statusCode, receivedData, lat, lon) => {
            const receivedDatawithInvalidCoordinates = receivedData[0]
            receivedDatawithInvalidCoordinates.lat = lat
            receivedDatawithInvalidCoordinates.lon = lon
            axios.get.mockResolvedValue({
                status: statusCode,
                data: [receivedDatawithInvalidCoordinates]
            })
          
            const expectedLocation = await fetchCoordinatesFromAddress(address)
        
            expect(expectedLocation.value).toEqual(undefined)
            expect(expectedLocation.errorMessage).not.toEqual(undefined)
        }
    )
    
})
