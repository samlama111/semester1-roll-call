import Constants from "expo-constants";
import { getAuth } from "firebase/auth";
import { HttpClient } from 'tsrpc-browser'
import { splitNameIntoFirstAndLast } from "../shared/models/Util";
import { serviceProto } from '../shared/protocols/serviceProto'

const { manifest } = Constants;

const uri = manifest && manifest.debuggerHost ? `http://${manifest.debuggerHost.split(':').shift()}:3000` : ''

// Create Client
export const client = new HttpClient(serviceProto, {
    server: uri,
    logger: console,
})

const getStudentId = async () => {
    const user = getAuth()
    const token = await user.currentUser?.getIdToken()
    return token
}

// get active enrollment where the student has not enrolled yet
export async function getEnrollment() {
    const token = await getStudentId()
    const res = await client.callApi('roll-call/GetRollCall', {
        jwtToken: token
    })
    return res
}

// student can enroll in active enrollment
export async function enroll(enrollmentId: string, lat: number, long: number) {
    const token = await getStudentId()
    const res = await client.callApi('roll-call/Enroll', {
        enrollment_id: enrollmentId,
        location: {
            lat,
            long
        },
        jwtToken: token
    })
    return res
}

export async function register(name: string, email: string) {
    const token = await getStudentId()
    const { firstName, lastName } = splitNameIntoFirstAndLast(name)
    const res = await client.callApi('students/CreateStudent', {
        firstname: firstName,
        lastname: lastName,
        email,
        jwtToken: token
    })
    return res
}
