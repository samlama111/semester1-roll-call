

import Constants from "expo-constants";
import { HttpClient } from 'tsrpc-browser'
import { serviceProto } from '../shared/protocols/serviceProto'

export const studentId = '6276511427fe23569812de6d'

const { manifest } = Constants;

const uri = manifest && manifest.debuggerHost ? `http://${manifest.debuggerHost.split(':').shift()}:3000` : ''

// Create Client
export const client = new HttpClient(serviceProto, {
    server: uri,
    // Remove this to use binary mode (remove from the server too)
    json: true,
    logger: console,
})

// get active enrollment where the student has not enrolled yet
export async function getEnrollment(studentId: string) {
    const res = await client.callApi('roll-call/GetRollCall', {
        student_id: studentId
    })
    return res
}

// student can enroll in active enrollment
export async function enroll(studentId: string, enrollmentId: string, lat: number, long: number) {
    const res = await client.callApi('roll-call/Enroll', {
        student_id: studentId,
        enrollment_id: enrollmentId,
        location: {
            lat,
            long
        }
    })
    return res
}
