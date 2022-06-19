import { ObjectId } from 'mongodb'

import { createStudent } from '../../../src/models/CreateStudent'
import { getStudent } from '../../../src/models/GetStudent'
import { listStudents } from '../../../src/models/ListStudents'
import { validStudent } from '../../__mocks__/student'

const Student = require('../../../src/db/Student')

const validFistName = 'John'
const validLastName = 'Doe'
const validEmail = 'john.doe420@stud.kea.dk'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
// eslint-disable-next-line max-len
const invalidEmail = 'aaaaščťľščž@gmail.com'

const validStudentId = new ObjectId()
const invalidStudentId = 'invalid id' as unknown as ObjectId

jest.mock('../../../src/db/Student')

describe('Create student', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validFistName, validLastName, validEmail]
    ])('should create a student and return him', async (
        firstName,
        lastName,
        email
    ) => {
        Student.insertStudent.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createStudent(firstName, lastName, email, undefined)

        expect(Student.insertStudent).toHaveBeenCalledTimes(1)
        expect(validCreate.value).toMatchObject({
            firstname: firstName,
            lastname: lastName,
            email
        })
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
    it.each([
        [validFistName, validLastName, validEmail]
    ])('should not create a student because of unsuccessful DB insert', async (
        name,
        lastname,
        email
    ) => {
        Student.insertStudent.mockResolvedValue({ acknowledged: false })
        const invalidCreate = await createStudent(name, lastname, email, undefined)

        expect(invalidCreate.errorMessage).toEqual('Create was not successful')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

describe('Get student', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a student by id and return it', async () => {
        Student.getStudentById.mockResolvedValue(validStudent)

        const validCreate = await getStudent(validStudentId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(1)
        expect(Student.getStudentById).toHaveBeenCalledWith(validStudentId)
        expect(validCreate.value).toMatchObject(validStudent)
    })

    it('should not get a student by id as db get fails', async () => {
        Student.getStudentById.mockResolvedValue(undefined)

        const validCreate = await getStudent(validStudentId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(1)
        expect(Student.getStudentById).toHaveBeenCalledWith(validStudentId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a student by id with invalid id', async () => {
        const validCreate = await getStudent(invalidStudentId)

        expect(Student.getStudentById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should get all students and return them', async () => {

        Student.getAllStudents.mockResolvedValue(validStudent)
        const validCreate = await listStudents()
        expect(Student.getAllStudents).toHaveBeenCalledTimes(1)
        expect(validCreate.value).not.toEqual(undefined)
    })

    it('should not get all students of wrong DB retrieval', async () => {

        Student.getAllStudents.mockResolvedValue(undefined)
        const students = await listStudents()
        expect(students.errorMessage).toEqual('No students found')
        expect(students.value).toEqual(undefined)
    })
})
