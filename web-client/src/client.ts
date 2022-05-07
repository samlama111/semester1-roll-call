import { HttpClient } from 'tsrpc-browser'

import { serviceProto } from './shared/protocols/serviceProto'

// Create Client
export const client = new HttpClient(serviceProto, {
    server: 'http://127.0.0.1:3000',
    // Remove this to use binary mode (remove from the server too)
    json: true,
    logger: console,
})

// get active enrollment where the student has not enrolled yet
export async function getEnrollment() {
    const res = await client.callApi('roll-call/GetRollCall', {
        student_id: '6274e9d4ed42132c92834a73'
    })
    return res
}

// student can enroll in active enrollment
export async function enroll() {
    const res = await client.callApi('roll-call/Enroll', {
        student_id: '6274e9d4ed42132c92834a73',
        enrollment_id: '627514deed42132c92834a85'
    })
    return res
}
