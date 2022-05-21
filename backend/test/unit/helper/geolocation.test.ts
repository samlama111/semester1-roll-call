import { fetchCoordinatesFromAddress } from '../../../src/helpers/geocodeAddress'
import { invalidData, validData, validLocation } from './geolocationMockData'

const axios = require('axios')

jest.mock('axios')

describe('Geolocation', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    // TODO: test invalid latitude values
    it.each([
        ['random a', validLocation, 200, validData]
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
        ['wrong', validLocation, 201, validData],
        ['wrong', validLocation, 400, invalidData],
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
        ['empty address', validLocation, 200, []],
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
})
