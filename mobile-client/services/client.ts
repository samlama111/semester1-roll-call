import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { WsClient } from 'tsrpc-browser'
import { serviceProto } from '../shared/protocols/serviceProto'

export const studentId = '6276511427fe23569812de6d'

const { manifest } = Constants;

const uri = manifest && manifest.debuggerHost ? `ws://${manifest.debuggerHost.split(':').shift()}:3000` : ''

// Create Client
export const client = new WsClient(serviceProto, {
    server: uri,
    // Remove this to use binary mode (remove from the server too)
    json: true,
    logger: console,
})

export const connect = async () => {
    if (!client.isConnected) {
        const res = await client.connect()
        if (!res.isSucc) return Promise.reject(new Error('WS connection failed'))
    }
    return Promise.resolve()
}

const getStudentId = async () => {
    const user = getAuth()
    const token = await user.currentUser?.getIdToken()
    return token
}

// get active enrollment where the student has not enrolled yet
export async function getEnrollment(studentId: string) {
    const token = await getStudentId()
    const res = await client.callApi('roll-call/GetRollCall', {
        student_id: studentId,
        jwtToken: token
    })
    return res
}

// student can enroll in active enrollment
export async function enroll(studentId: string, enrollmentId: string, lat: number, long: number) {
    const token = await getStudentId()
    const res = await client.callApi('roll-call/Enroll', {
        student_id: studentId,
        enrollment_id: enrollmentId,
        location: {
            lat,
            long
        },
        jwtToken: token
    })
    return res
}
