import { ObjectId } from 'mongodb'

import { enrollStudent } from '../db/Course'
import { areCoordinatesValid, validateObjectId } from '../helpers/validator'
import { Location } from '../shared/models/Location'
import { ModelReturnType } from './ModelReturnType'
import { validateLocation } from './ValidateLocation'

export const enroll = async (enrollmentId: ObjectId, location: Location, studentId?: string):
  Promise<ModelReturnType<boolean>> => {
    if (!areCoordinatesValid(location)) {
        return {
            value: false,
            errorMessage: 'Invalid location'
        }
    }
    if (!validateObjectId(enrollmentId)) {
        return {
            value: false,
            errorMessage: 'Use a valid enrollment id'
        }
    }

    const isLocationValid = await validateLocation(enrollmentId, location)
    if (!isLocationValid.value) {
        return {
            value: false,
            errorMessage: isLocationValid.errorMessage
        }
    }  

    const res = await enrollStudent(enrollmentId, studentId)

    if (!res.matchedCount) {
        return {
            value: false,
            errorMessage: 'Failed to find the enrollment'
        }
    }
    if (!res.modifiedCount) {
        return {
            value: false,
            errorMessage: 'You are already enrolled'
        }
    }
    return {
        value: true
    }
}
