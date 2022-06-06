import { ObjectId } from 'mongodb'

import { getAttendanceByClassId } from '../../../src/models/GetAttendanceByClass'
import { getAttendanceByCourseId } from '../../../src/models/GetAttendanceByCourse'
import { validCourse, validCourseAttendance } from '../../__mocks__/course'

const Course = require('../../../src/db/Course')

jest.mock('../../../src/db/Course')
jest.mock('../../../src/db/Class')

describe('Get attendance by course and class', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should get an attendance by course id and return it', async () => {
        const objectId = new ObjectId()
        Course.getCourseById.mockResolvedValue(validCourse)

        const attendance = await getAttendanceByCourseId(objectId)

        expect(Course.getCourseById).toHaveBeenCalledTimes(1)
        expect(Course.getCourseById).toHaveBeenCalledWith(objectId)
        expect(attendance.value).toMatchObject(validCourseAttendance)
    })
    it('should get an attendance by class id and return it', async () => {
        const objectId = new ObjectId()
        Course.getCoursesByClassId.mockResolvedValue({ value: [validCourse] })

        const attendance = await getAttendanceByClassId(objectId)

        expect(attendance.value).toMatchObject([validCourseAttendance])
    })
})
