import { client } from '../client'

// teacher can start roll call
export async function startRollCall(courseId: string) {
    return client.callApi('roll-call/StartRollCall', { course_id: courseId })
}

// teacher can end roll call
export async function endRollCall() {
    return client.callApi('roll-call/EndRollCall', {
        enrollment_id: '62765fc927fe23569812de7e',
        course_id: '62763fdb27fe23569812de40' 
    })
}
