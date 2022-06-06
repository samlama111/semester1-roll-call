import { ObjectId } from 'mongodb'

import { createTeacher } from '../../../src/models/CreateTeacher'
import { getTeacher } from '../../../src/models/GetTeacher'
import { getTeacherClasses } from '../../../src/models/GetTeacherClasses'
import { getTeacherCourses } from '../../../src/models/GetTeacherCourses'
import { listTeachers } from '../../../src/models/ListTeachers'
import { validCourse } from '../../__mocks__/course'
import { validTeacher } from '../../__mocks__/teacher'

const Teacher = require('../../../src/db/Teacher')
const Course = require('../../../src/db/Course')

const validFistName = 'John'
const validLastName = 'Doe'
const validEmail = 'john.doe420@stud.kea.dk'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'
// eslint-disable-next-line max-len
const invalidEmail = 'aaaaščťľščž@gmail.com'

jest.mock('../../../src/db/Teacher')
jest.mock('../../../src/db/Course')

describe('Create teacher', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validFistName, validLastName, validEmail]
    ])('should create a teacher and return him', async (
        firstName,
        lastName,
        email
    ) => {
        Teacher.insertTeacher.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createTeacher(firstName, lastName, email)

        expect(Teacher.insertTeacher).toHaveBeenCalledTimes(1)
        expect(validCreate.value).toMatchObject({
            firstname: firstName,
            lastname: lastName,
            email
        })
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
    it('should get all teachers and return them', async () => {

        Teacher.getAllTeachers.mockResolvedValue(validTeacher)
        const teachers = await listTeachers()
        expect(Teacher.getAllTeachers).toHaveBeenCalledTimes(1)
        expect(teachers.value).not.toEqual(undefined)
    })
})

describe('Get teacher classes courses and roll call', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get teachers classes', async () => {
        const teacherId = ''
        Course.getCoursesByTeacherId.mockResolvedValue({ value: [validCourse] })

        const classes = await getTeacherClasses(teacherId)

        expect(Course.getCoursesByTeacherId).toHaveBeenCalledTimes(1)
        expect(classes.value?.some(({ name }) => name === validCourse.class_name)).toBe(true)
    })

    it('should get teachers courses', async () => {
        const teacherId = 'stringstringstringstring'
        Course.getCoursesByTeacherId.mockResolvedValue({ value: validCourse })

        const courses = await getTeacherCourses(teacherId)

        expect(Course.getCoursesByTeacherId).toHaveBeenCalledTimes(1)
        expect(courses.value).toMatchObject(validCourse)
    })
    // TODO
    // it('should get teachers roll calls', async () => {
    //     const objectId = new ObjectId()
    //     Teacher.getTeacherById.mockResolvedValue(validTeacher)
    //
    //     const validCreate = await (objectId)
    //
    //     expect(Course.getCoursesByTeacherId).toHaveBeenCalledTimes(1)
    //     expect(validCreate.value).toMatchObject(validClass)
    // })
})
