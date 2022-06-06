import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'

import { server } from '../../../testSetup'

describe('Teacher', () => {
    let auth: any
    const teacherId = '6Rr4yeijk3NVYdwZXzhxmkkH3ts7'
    beforeAll(async () => {
        const customToken = await firebaseAdmin.auth().createCustomToken(teacherId)

        const testAuth = initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN
        })
        auth = getAuth(testAuth)
        await signInWithCustomToken(auth, customToken)
    })
    it('should create a teacher', async () => {
        const token = await auth.currentUser?.getIdToken()

        const ret1 = await (await server.getInstance()).callApi('teachers/CreateTeacher', {
            firstname: 'new',
            lastname: 'teacher',
            email: 'new@teacher.com',
            jwtToken: token
        })

        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res?.teacher).toMatchObject({
            firstname: 'new',
            lastname: 'teacher',
            email: 'new@teacher.com',
        })
    })
    it('should list teachers', async () => {
        const ret1 = await (await server.getInstance()).callApi('teachers/ListTeachers', {
        })
        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res?.teachers).not.toBeNull()
        expect(ret1.res?.teachers.length).toBeGreaterThan(0)
    })
})
