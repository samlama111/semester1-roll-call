import { ObjectId } from 'mongodb'
import { ApiCall } from 'tsrpc'

import { getCampusById } from '../../db/Campus'
import { enrollStudent, getFirstCourseCampusIdByEnrollmentId } from '../../db/Course'
import { getDistanceFromLatLonInKm } from '../../helpers/location'
import { Location } from '../../shared/models/Location'
import { ReqEnroll, ResEnroll } from '../../shared/protocols/roll-call/PtlEnroll'

export async function ApiEnroll(call: ApiCall<ReqEnroll, ResEnroll>) {
    if (!call.req.enrollment_id) {
        call.error('Please provide an enrollment_id')
        return
    }
    if (!call.req.location) {
        call.error('Location was not provided')
        return
    }

    if (!await checkLocation(call.req.enrollment_id, call.req.location, call.error)) return 

    const res = await enrollStudent(call.currentUserId, call.req.enrollment_id)

    if (!res.matchedCount) {
        call.error('Failed to find the enrollment')
        return
    }
    if (!res.modifiedCount) {
        call.error('You are already enrolled')
        return
    }

    call.succ({
        message: 'successfully enrolled'
    })
}

const checkLocation = async (
    enrollmentId: ObjectId,
    location: Location, 
    errorFunction: (errorMessage: string) => Promise<void>
) => {
    const course = await getFirstCourseCampusIdByEnrollmentId(enrollmentId)

    if (!course) {
        errorFunction('Course not found')
        return false
    }
    const campus = await getCampusById(course.campus_id)

    if (!campus) {
        errorFunction('Campus not found')
        return false
    }

    const { lat, long } = location
    const distance = getDistanceFromLatLonInKm(lat, long, campus.location.lat, campus.location.long)

    if (distance > 0.15) {
        errorFunction('Location is too far away from campus')
        return false
    }
    return true
}
