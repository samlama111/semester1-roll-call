import { ObjectId } from 'mongodb'

import { createTeacher } from '../../../src/models/CreateTeacher'
import { getTeacher } from '../../../src/models/GetTeacher'
import { validTeacher } from '../../__mocks__/teacher'

const Teacher = require('../../../src/db/Teacher')

const validFistName = 'John'
const validLastName = 'Doe'
const validEmail = 'john.doe420@stud.kea.dk'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
// eslint-disable-next-line max-len
const invalidEmail = 'aaaaščťľščž@gmail.com'

jest.mock('../../../src/db/Teacher')

describe('Create teacher', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validFistName, validLastName, validEmail]
    ])('should create a teacher and return him', async (
        firstname,
        lastname,
        email
    ) => {
        Teacher.insertTeacher.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createTeacher(firstname, lastname, email, undefined)

        expect(Teacher.insertTeacher).toHaveBeenCalledTimes(1)
        // TODO?
        expect(validCreate.value).toMatchObject({})
    })

    it.each([
        [invalidLengthName, validLastName, validEmail]
    ])('should not create a teacher because of invalid first name length', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createTeacher(name, lastname, email, undefined)

        expect(Teacher.insertTeacher).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid name')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validFistName, invalidLengthName, validEmail]
    ])('should not create a teacher because of invalid last name length', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createTeacher(name, lastname, email, undefined)

        expect(Teacher.insertTeacher).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid name')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validFistName, validLastName, invalidEmail]
    ])('should not create a teacher because of invalid email', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createTeacher(name, lastname, email, undefined)

        expect(Teacher.insertTeacher).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid email used')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

describe('Get teacher', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a teacher by id and return it', async () => {
        const objectId = new ObjectId()
        Teacher.getTeacherById.mockResolvedValue(validTeacher)

        const validCreate = await getTeacher(objectId)

        expect(Teacher.getTeacherById).toHaveBeenCalledTimes(1)
        expect(Teacher.getTeacherById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toMatchObject(validTeacher)
    })

    it('should not get a teacher by id as db get fails', async () => {
        const objectId = new ObjectId()
        Teacher.getTeacherById.mockResolvedValue(undefined)

        const validCreate = await getTeacher(objectId)

        expect(Teacher.getTeacherById).toHaveBeenCalledTimes(1)
        expect(Teacher.getTeacherById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a teacher by id with invalid id', async () => {
        const objectId = 'invalid id' as unknown as ObjectId

        const validCreate = await getTeacher(objectId)

        expect(Teacher.getTeacherById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })
})
