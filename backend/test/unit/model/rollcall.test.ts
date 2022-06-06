import { ObjectId } from 'mongodb'

import { addEnrollmentToCourse, enrollStudent, setEnrollmentNotActive } from '../../../src/db/Course'
import { endRollCall } from '../../../src/models/EndRollCall'
import { getStudentRollCall } from '../../../src/models/GetStudentRollCall'
import { startRollCall } from '../../../src/models/StartRollCall'
import { validCourse } from '../../__mocks__/course'
import { validEnrollment } from '../../__mocks__/enrollment'

const Course = require('../../../src/db/Course')

jest.mock('../../../src/db/Course')
let rollCallId : ObjectId | undefined
// TODO add negative asserts
describe('Do roll call flow', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should start a rollcall and return it', async () => {
        Course.getMostRecentStudentEnrollment.mockResolvedValue(validCourse)
        Course.addEnrollmentToCourse.mockResolvedValue(validCourse)

        const validCreate = await startRollCall(validCourse._id, validCourse.teacher_id)

        expect(addEnrollmentToCourse).toHaveBeenCalledTimes(1)
        rollCallId = validCreate.value?._id
        expect(validCreate.value?.roll_call_started).toBeTruthy()
    })
    it('should end a rollcall', async () => {
        Course.setEnrollmentNotActive.mockResolvedValue({ ok: 1, value: validCourse })

        const validCreate = await endRollCall(validCourse.enrollments[0]._id)
        expect(setEnrollmentNotActive).toHaveBeenCalledTimes(1)
        expect(validCreate.value).toMatchObject(validCourse.enrollments[0])
    })
    
    it('should enroll a student', async () => {
        Course.enrollStudent.mockResolvedValue(true)

        const validCreate = await enrollStudent(rollCallId as ObjectId, '')

        expect(enrollStudent).toHaveBeenCalledTimes(1)
        expect(validCreate).toBeTruthy()
    })
    it('should get students roll call', async () => {
        Course.getMostRecentStudentEnrollment.mockResolvedValue({
            ...validCourse,
            last: validEnrollment
        })

        const validCreate = await getStudentRollCall(
            validEnrollment.enrolled_student_ids[validEnrollment.enrolled_student_ids.length - 1]
        )

        expect(validCreate.value).not.toEqual(undefined)
        expect(validCreate.value?.roll_call_id).toEqual(validEnrollment._id)
        expect(validCreate.value?.is_student_enrolled).toBeTruthy()
        expect(validCreate.value?.course_info).toMatchObject({
            name: validCourse.name,
            class_name: validCourse.class_name
        })
    })
})
