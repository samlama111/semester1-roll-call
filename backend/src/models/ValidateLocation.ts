import { ObjectId } from 'mongodb'

import { getCampusById } from '../db/Campus'
import { getFirstCourseCampusIdByEnrollmentId } from '../db/Course'
import { getDistanceFromLatLonInKm } from '../helpers/location'
import { Location } from '../shared/models/Location'
import { ModelReturnType } from './ModelReturnType'

export const validateLocation = async (enrollmentId: ObjectId, location: Location):
  Promise<ModelReturnType<boolean>> => {
    const course = await getFirstCourseCampusIdByEnrollmentId(enrollmentId)

    if (!course) {
        return {
            value: false,
            errorMessage: 'Course not found'
        }
    }
    const campus = await getCampusById(course.campus_id)

    if (!campus) {
        return {
            value: false,
            errorMessage: 'Campus not found'
        }
    }

    const { lat, long } = location
    const distance = getDistanceFromLatLonInKm(lat, long, campus.location.lat, campus.location.long)
    if (distance === undefined) {
        return {
            value: false,
            errorMessage: 'Invalid latitude or longitude'
        }
    }
    if (distance > campus.radius) {
        return {
            value: false,
            errorMessage: 'Location is too far away from campus'
        }
    }
    return { value: true }
}

export default validateLocation
