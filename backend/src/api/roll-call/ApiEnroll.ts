import { ApiCall } from "tsrpc";
import { Global } from "../../db/Global";
import { getDistanceFromLatLonInKm } from "../../shared/models/Util";
import { ReqEnroll, ResEnroll } from "../../shared/protocols/roll-call/PtlEnroll";

export async function ApiEnroll(call: ApiCall<ReqEnroll, ResEnroll>) {
    if (!call.req.enrollment_id) {
        call.error('Please provide an enrollment_id')
        return
    }
    if (!call.req.location) {
        call.error('Location was not provided')
        return
    }

    if (!await checkLocation(call)) return 

    const res = await Global.collection('Course').updateOne(
        { 
            "enrollments._id": call.req.enrollment_id,
        },
        { "$addToSet": 
            {
                "enrollments.$.enrolled_student_ids": call.req.currentUserId
            }
        }
    )

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

const checkLocation = async (call: ApiCall<ReqEnroll, ResEnroll>) => {
    const course = await Global.collection('Course').findOne({
        "enrollments._id": call.req.enrollment_id
    }, { projection: { campus_id: 1 } })

    if (!course) {
        call.error('Course not found')
        return false
    }
    const campus = await Global.collection('Campus').findOne({
        _id: course?.campus_id
    })

    if (!campus) {
        call.error('Campus not found')
        return false
    }

    const { lat, long } = call.req.location
    const distance = getDistanceFromLatLonInKm(lat, long, campus.location.latitude, campus.location.longitude)

    if (distance > 0.15) {
        call.error('Location is too far away from campus')
        return false
    }
    return true
}