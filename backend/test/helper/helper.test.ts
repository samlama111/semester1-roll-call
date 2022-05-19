/* eslint-disable no-undef */

import { fetchCoordinatesFromAddress } from '../../src/helpers/geocodeAddress'
import { invalidData, validData, validLocation } from './helperMockData'

const axios = require('axios')

jest.mock('axios')

describe('Geolocation', () => {
    const logSpy = jest.spyOn(console, 'log')
    beforeEach(() => {
        jest.clearAllMocks()
    })

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
          
        const expectedLocation = await fetchCoordinatesFromAddress(address, console.log)
        
        expect(expectedLocation).toEqual(locationObject)
        expect(statusCode).toEqual(200)
        expect(logSpy).toBeCalledTimes(0)
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
          
            const expectedLocation = await fetchCoordinatesFromAddress(address, console.log)
        
            expect(expectedLocation).toEqual(undefined)
            expect(statusCode).not.toEqual(200)
            expect(logSpy).toBeCalledTimes(1)
            expect(logSpy).toBeCalledWith('Failed finding coordinates')
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
          
            const expectedLocation = await fetchCoordinatesFromAddress(address, console.log)
        
            expect(expectedLocation).toEqual(undefined)
            expect(statusCode).toEqual(200)
            expect(logSpy).toBeCalledTimes(1)
            expect(logSpy).toBeCalledWith('Invalid address')
        }
    )
})
