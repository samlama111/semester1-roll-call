import { ObjectId } from 'mongodb'

import { createStudent } from '../../../src/models/CreateStudent'
import { getStudent } from '../../../src/models/GetStudent'
import { validStudent } from '../../__mocks__/student'

const Student = require('../../../src/db/Student')

const validFistName = 'John'
const validLastName = 'Doe'
const validEmail = 'john.doe420@stud.kea.dk'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
// eslint-disable-next-line max-len
const invalidEmail = 'aaaaščťľščž@gmail.com'

jest.mock('../../../src/db/Student')

describe('Create student', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validFistName, validLastName, validEmail]
    ])('should create a student and return him', async (
        firstname,
        lastname,
        email
    ) => {
        Student.insertStudent.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createStudent(firstname, lastname, email, undefined)

        expect(Student.insertStudent).toHaveBeenCalledTimes(1)
        // TODO?
        expect(validCreate.value).toMatchObject({})
    })

    it.each([
        [invalidLengthName, validLastName, validEmail]
    ])('should not create a student because of invalid first name length', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createStudent(name, lastname, email, undefined)

        expect(Student.insertStudent).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid name')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validFistName, invalidLengthName, validEmail]
    ])('should not create a student because of invalid last name length', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createStudent(name, lastname, email, undefined)

        expect(Student.insertStudent).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid name')
        expect(invalidCreate.value).toEqual(undefined)
    })

    it.each([
        [validFistName, validLastName, invalidEmail]
    ])('should not create a student because of invalid email', async (
        name,
        lastname,
        email
    ) => {
        const invalidCreate = await createStudent(name, lastname, email, undefined)

        expect(Student.insertStudent).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid email used')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

describe('Get student', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a student by id and return it', async () => {
        const objectId = new ObjectId()
        Student.getStudentById.mockResolvedValue(validStudent)

        const validCreate = await getStudent(objectId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(1)
        expect(Student.getStudentById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toMatchObject(validStudent)
    })

    it('should not get a student by id as db get fails', async () => {
        const objectId = new ObjectId()
        Student.getStudentById.mockResolvedValue(undefined)

        const validCreate = await getStudent(objectId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(1)
        expect(Student.getStudentById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a student by id with invalid id', async () => {
        const objectId = 'invalid id' as unknown as ObjectId

        const validCreate = await getStudent(objectId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })
})
