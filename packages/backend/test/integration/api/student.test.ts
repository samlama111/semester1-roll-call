import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'

import { server } from '../../../testSetup'

describe('Student', () => {
    let auth: any
    const studentId = '6Rr4yeijk3NVYdwZXzhxmkkH3ts8'
    beforeAll(async () => {
        const customToken = await firebaseAdmin.auth().createCustomToken(studentId)

        const testAuth = initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN
        })
        auth = getAuth(testAuth)
        await signInWithCustomToken(auth, customToken)
    })
    it('should create a student', async () => {
        const token = await auth.currentUser?.getIdToken()

        const ret1 = await (await server.getInstance()).callApi('students/CreateStudent', {
            firstname: 'new',
            lastname: 'student',
            email: 'new@student.com',
            jwtToken: token
        })

        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res?.student).toMatchObject({
            firstname: 'new',
            lastname: 'student',
            email: 'new@student.com',
        })
    })
    it('should get students int.', async () => {
        const ret1 = await (await server.getInstance()).callApi('students/ListStudents', {
        })
        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res?.students).not.toBeNull()
    })
})
