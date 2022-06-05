import { ObjectId } from 'mongodb'

import { createCourse } from '../../../src/models/CreateCourse'
import { getCourse } from '../../../src/models/GetCourse'
import { DbCourse } from '../../../src/shared/db/DbCourse'
import { validClass } from '../../__mocks__/class'
import { validCourse } from '../../__mocks__/course'

const Course = require('../../../src/db/Course')
const Class = require('../../../src/db/Class')

const validName = 'Coursee'
// eslint-disable-next-line max-len
const invalidLengthName = 'aliquam ut porttitor leo a diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam'

jest.mock('../../../src/db/Course')
jest.mock('../../../src/db/Class')

describe('Create course', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it.each([
        [validName, new ObjectId().toString(), new ObjectId(), new ObjectId()]
    ])('should create a course and return it', async (
        name,
        teacher,
        classId,
        campus
    ) => {
        Class.getClassById.mockResolvedValue(validClass)
        Course.insertCourse.mockResolvedValue({
            acknowledged: true
        })

        const validCreate = await createCourse(name, classId, campus, teacher)

        expect(Course.insertCourse).toHaveBeenCalledTimes(1)
        const newCourse: DbCourse = {
            ...validCourse, name, teacher_id: teacher, class_id: classId, campus_id: campus, class_name: validClass.name
        }
        expect(validCreate.value).toMatchObject(newCourse)
    })

    it.each([
        [invalidLengthName, '', new ObjectId(), new ObjectId()]
    ])('should not create a course because of invalid course name length', async (
        name,
        teacher,
        classId,
        campus
    ) => {
        const invalidCreate = await createCourse(name, classId, campus, teacher)

        expect(Course.insertCourse).toHaveBeenCalledTimes(0)
        expect(invalidCreate.errorMessage).toEqual('Invalid course name')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

describe('Get course', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get a course by id and return it', async () => {
        const objectId = new ObjectId()
        Course.getCourseById.mockResolvedValue(validCourse)

        const validCreate = await getCourse(objectId)

        expect(Course.getCourseById).toHaveBeenCalledTimes(1)
        expect(Course.getCourseById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toMatchObject(validCourse)
    })

    it('should not get a course by id as db get fails', async () => {
        const objectId = new ObjectId()
        Course.getCourseById.mockResolvedValue(undefined)

        const validCreate = await getCourse(objectId)

        expect(Course.getCourseById).toHaveBeenCalledTimes(1)
        expect(Course.getCourseById).toHaveBeenCalledWith(objectId)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })

    it('should not get a course by id with invalid id', async () => {
        const objectId = 'invalid id' as unknown as ObjectId

        const validCreate = await getCourse(objectId)

        expect(Course.getCourseById).toHaveBeenCalledTimes(0)
        expect(validCreate.value).toEqual(undefined)
        expect(validCreate.errorMessage).not.toEqual(undefined)
    })
})
