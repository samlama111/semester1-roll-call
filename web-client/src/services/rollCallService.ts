import { client } from '../client'

// teacher can start roll call
export async function startRollCall(classId: string, courseId: string) {
    return client.callApi('roll-call/StartRollCall', { course_id: courseId, class_id: classId })
}

// teacher can end roll call
export async function endRollCall() {
    return client.callApi('roll-call/EndRollCall', { enrollment_id: 'xxx' })
}
