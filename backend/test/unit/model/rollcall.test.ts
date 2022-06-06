import { ObjectId } from 'mongodb'

import { addEnrollmentToCourse, enrollStudent, setEnrollmentNotActive } from '../../../src/db/Course'
import { endRollCall } from '../../../src/models/EndRollCall'
import { enroll } from '../../../src/models/EnrollStudent'
import { getStudentRollCall } from '../../../src/models/GetStudentRollCall'
import { startRollCall } from '../../../src/models/StartRollCall'
import { Location } from '../../../src/shared/models/Location'
import { validCourse } from '../../__mocks__/course'
import { validEnrollment } from '../../__mocks__/enrollment'

const Course = require('../../../src/db/Course')

const validateLocation = require('../../../src/models/ValidateLocation')
 
jest.mock('../../../src/db/Course')
jest.mock('../../../src/models/ValidateLocation')

describe('Teacher manage roll-call', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should start a rollcall and return it', async () => {
        Course.getMostRecentStudentEnrollment.mockResolvedValue(validCourse)
        Course.addEnrollmentToCourse.mockResolvedValue(validCourse)

        const validCreate = await startRollCall(validCourse._id, validCourse.teacher_id)

        expect(addEnrollmentToCourse).toHaveBeenCalledTimes(1)
        expect(validCreate.value?.roll_call_started).toBeTruthy()
    })
    it('should end a rollcall', async () => {
        Course.setEnrollmentNotActive.mockResolvedValue({ ok: 1, value: validCourse })

        const validCreate = await endRollCall(validCourse.enrollments[0]._id)
        expect(setEnrollmentNotActive).toHaveBeenCalledTimes(1)
        expect(validCreate.value).toMatchObject(validCourse.enrollments[0])
    })
    it('should fail to end a rollcall', async () => {
        Course.setEnrollmentNotActive.mockResolvedValue({ ok: 0, value: undefined })

        const invalidCreate = await endRollCall(validCourse.enrollments[0]._id)
        expect(invalidCreate.errorMessage).toEqual('Roll call could not be ended')
        expect(invalidCreate.value).toEqual(undefined)
    })
})

const validLocation: Location = {
    lat: 50,
    long: 50
}
const invalidLocation: Location = {
    lat: -91,
    long: 181
}

describe('Student manage enrollment', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should enroll a student', async () => {
        Course.enrollStudent.mockResolvedValue({
            matchedCount: 1,
            modifiedCount: 1
        })

        validateLocation.validateLocation.mockResolvedValue({
            value: true
        })

        const newEnrollment = await enroll(new ObjectId(), validLocation, 'student id')

        expect(enrollStudent).toHaveBeenCalledTimes(1)
        expect(newEnrollment.value).toBeTruthy()
    })
    it.each([
        // invalid location
        [1, 1, true, 0, invalidLocation],   
        [1, 1, false, 0, validLocation],  
        // unsuccessful insert
        [0, 1, true, 1, validLocation], 
        [1, 0, true, 1, validLocation],    
    ])('should not enroll a student', async (
        matchedCount,
        modifiedCount,
        isLocationValid,
        enrollCalledTimes,
        location
    ) => {
        Course.enrollStudent.mockResolvedValue({
            matchedCount,
            modifiedCount
        })

        validateLocation.validateLocation.mockResolvedValue({
            value: isLocationValid
        })

        const newEnrollment = await enroll(new ObjectId(), location, 'student id')

        expect(enrollStudent).toHaveBeenCalledTimes(enrollCalledTimes)
        expect(newEnrollment.value).toBeFalsy()
    })
    
    it('should get students roll call', async () => {
        Course.getMostRecentStudentEnrollment.mockResolvedValue(validCourse)

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
    it('should not get students roll call', async () => {
        Course.getMostRecentStudentEnrollment.mockResolvedValue(undefined)

        const invalidCreate = await getStudentRollCall(
            validEnrollment.enrolled_student_ids[validEnrollment.enrolled_student_ids.length - 1]
        )

        expect(invalidCreate.errorMessage).toEqual('No ongoing roll call found')
        expect(invalidCreate.value).toEqual(undefined)
    })
})
