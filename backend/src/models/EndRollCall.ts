import { ObjectId } from 'mongodb'

import { setEnrollmentNotActive } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { DbEnrollment } from '../shared/db/DbEnrollment'
import { ModelReturnType } from './ModelReturnType'

export const endRollCall = async (enrollmentId: ObjectId):
  Promise<ModelReturnType<DbEnrollment | undefined>> => {
    if (!validateObjectId(enrollmentId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid enrollment id'
        }
    }
    const course = await setEnrollmentNotActive(enrollmentId)

    if (!course.ok || !course.value) {
        return {
            value: undefined,
            errorMessage: 'Role call could not be ended'
        }
    }

    const enrollmentIndex = course.value.enrollments.findIndex((enrollment) => enrollment._id.equals(enrollmentId))
    const endedRollCall = course.value.enrollments[enrollmentIndex]

    return {
        value: endedRollCall
    }
}
