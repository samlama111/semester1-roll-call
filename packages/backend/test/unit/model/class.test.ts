import { ObjectId } from 'mongodb'

import { createClass } from '../../../src/models/CreateClass'
import { getClass } from '../../../src/models/GetClass'
import { listClasses } from '../../../src/models/ListClasses'
import { validClass } from '../../__mocks__/class'

const Class = require('../../../src/db/Class')

const validName = 'Geography'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
jest.mock('../../../src/db/Class')

describe('Create class', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validName]
    ])('should create a class and return it', async (
        name,
    ) => {
        Class.insertClass.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createClass(name)

        expect(Class.insertClass).toHaveBeenCalledTimes(1)
        expect(validCreate.value).toMatchObject({ name })
    })

    it.each([
        [invalidLengthName]
    ])('should not create a class because of invalid class name length', async (
        name
    ) => {
        const invalidCreate = await createClass(name)

        expect(Class.insertClass).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Class name format is not correct')
        expect(invalidCreate.value).toEqual(undefined)
    })
    it.each([
        [validName]
    ])('should not create a class because of unsuccessful DB insert', async (
        name
    ) => {
        Class.insertClass.mockResolvedValue({ acknowledged: false })
        const invalidCreate = await createClass(name)

        expect(invalidCreate.errorMessage).toEqual('Create was not successful')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

describe('Get class', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a class by id and return it', async () => {
        const objectId = new ObjectId()
        Class.getClassById.mockResolvedValue(validClass)

        const validCreate = await getClass(objectId)

        expect(Class.getClassById).toHaveBeenCalledTimes(1)
        expect(Class.getClassById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toMatchObject(validClass)
    })

    it('should not get a class by id as db get fails', async () => {
        const objectId = new ObjectId()
        Class.getClassById.mockResolvedValue(undefined)

        const validCreate = await getClass(objectId)

        expect(Class.getClassById).toHaveBeenCalledTimes(1)
        expect(Class.getClassById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a class by id with invalid id', async () => {
        const objectId = 'invalid id' as unknown as ObjectId

        const validCreate = await getClass(objectId)

        expect(Class.getClassById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })
    it('should get all classes and return them', async () => {

        Class.getAllClasses.mockResolvedValue(validClass)
        const validCreate = await listClasses()
        expect(Class.getAllClasses).toHaveBeenCalledTimes(1)
        expect(validCreate.value).not.toEqual(undefined)
    })
    it('should not get all classes because of wrong DB retrieval', async () => {

        Class.getAllClasses.mockResolvedValue(undefined)
        const classes = await listClasses()
        expect(classes.errorMessage).toEqual('No classes found')
        expect(classes.value).toEqual(undefined)
    })
})
