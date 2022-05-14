import { client, getTeacherId } from '../client'

// teacher can start roll call
export async function startRollCall(courseId: string) {
    const token = await getTeacherId()
    return client.callApi('roll-call/StartRollCall', { course_id: courseId, jwtToken: token })
}

// teacher can end roll call
export async function endRollCall(enrollmentId: string, courseId: string) {
    const token = await getTeacherId()
    return client.callApi('roll-call/EndRollCall', {
        enrollment_id: enrollmentId,
        course_id: courseId,
        jwtToken: token
    })
}
