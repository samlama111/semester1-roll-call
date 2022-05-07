import { client } from '../client'

// teacher can start roll call
export async function startRollCall(courseId: string) {
    return client.callApi('roll-call/StartRollCall', { course_id: courseId })
}

// teacher can end roll call
export async function endRollCall(enrollmentId: string, courseId: string) {
    return client.callApi('roll-call/EndRollCall', {
        enrollment_id: enrollmentId,
        course_id: courseId
    })
}
