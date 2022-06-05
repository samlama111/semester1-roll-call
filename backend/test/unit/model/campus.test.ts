import { ObjectId } from 'mongodb'

import { convertStringToInt } from '../../../src/helpers/stringHandler'
import { createCampus } from '../../../src/models/CreateCampus'
import { getCampus } from '../../../src/models/GetCampus'
import { validCampus } from '../../__mocks__/campus'
import { validData } from '../../__mocks__/geolocationMockData'

const Campus = require('../../../src/db/Campus')
const Location = require('../../../src/helpers/location')

jest.mock('../../../src/db/Campus')
jest.mock('../../../src/helpers/location')

const validName = 'Campus one'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
const validAddress = 'Avenue 12'
// eslint-disable-next-line max-len
const invalidLengthAddress = '10 nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus purus in massa tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse'
const validRadius = 0.1
const invalidRadius = -0.1
const invalidBoundaryRadius = 0

describe('Create campus', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validName, validAddress, validRadius]
    ])('should create a campus and return it', async (
        name,
        address,
        radius
    ) => {
        const validLocation = {
            lat: convertStringToInt(validData[0].lat) as number,
            long: convertStringToInt(validData[0].lon) as number
        }
        Location.fetchCoordinatesFromAddress.mockResolvedValue({
            value: validLocation
        })
        Campus.insertCampus.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createCampus(name, address, radius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(1)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(1)
        expect(Campus.insertCampus).toHaveBeenCalledWith(expect.objectContaining({
            name,
            location: validLocation
        }))
        expect(validCreate.value).toMatchObject({
            name,
            location: validLocation
        })
    })

    it.each([
        [invalidLengthName, validAddress]
    ])('should not create a campus because of invalid name length', async (
        name,
        address
    ) => {
        const invalidCreate = await createCampus(name, address, validRadius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(0)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid campus name length')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validAddress, invalidLengthAddress]
    ])('should not create a campus because of invalid address length', async (
        name,
        address
    ) => {
        const invalidCreate = await createCampus(name, address, validRadius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(0)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid address length')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validName, validAddress, invalidRadius],
        [validName, validAddress, invalidBoundaryRadius]
    ])('should not create a campus because of invalid radius size', async (
        name,
        address,
        radius
    ) => {
        const invalidCreate = await createCampus(name, address, radius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(0)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).not.toEqual(undefined)
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validName, validAddress]
    ])('should not create a campus because of invalid fetched address', async (
        name,
        address
    ) => {
        Location.fetchCoordinatesFromAddress.mockResolvedValue({
            value: undefined
        })

        const invalidCreate = await createCampus(name, address, validRadius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(1)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(0)
        expect(invalidCreate.value).toEqual(undefined)
    })  
    
    it.each([
        [validName, validAddress, false],
        [validName, validAddress, undefined]
    ])('should not create a campus because of an unsuccesful database insert', async (
        name,
        address,
        acknowledgeResult
    ) => {
        const validLocation = {
            lat: convertStringToInt(validData[0].lat) as number,
            long: convertStringToInt(validData[0].lon) as number
        }
        Location.fetchCoordinatesFromAddress.mockResolvedValue({
            value: validLocation
        })
        Campus.insertCampus.mockResolvedValue({
            acknowledged: acknowledgeResult
        })

        const invalidCreate = await createCampus(name, address, validRadius)
        
        expect(Location.fetchCoordinatesFromAddress).toHaveBeenCalledTimes(1)
        expect(Campus.insertCampus).toHaveBeenCalledTimes(1)
        expect(invalidCreate.value).toEqual(undefined)
        expect(invalidCreate.errorMessage).toEqual('Campus creation was not successful')
    })
})

describe('Get campus', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a campus by id and return it', async () => {
        const objectId = new ObjectId()
        Campus.getCampusById.mockResolvedValue(validCampus)

        const validCreate = await getCampus(objectId)
        
        expect(Campus.getCampusById).toHaveBeenCalledTimes(1)
        expect(Campus.getCampusById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toMatchObject(validCampus)
    })

    it('should not get a campus by id as db get fails', async () => {
        const objectId = new ObjectId()
        Campus.getCampusById.mockResolvedValue(undefined)

        const validCreate = await getCampus(objectId)
        
        expect(Campus.getCampusById).toHaveBeenCalledTimes(1)
        expect(Campus.getCampusById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a campus by id with invalid id', async () => {
        const objectId = 'invalid id' as unknown as ObjectId

        const validCreate = await getCampus(objectId)
        
        expect(Campus.getCampusById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })
})
