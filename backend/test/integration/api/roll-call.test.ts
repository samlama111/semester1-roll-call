import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithCustomToken
} from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { server } from '../../../testSetup'
import { validClass } from '../../__mocks__/class'

const Class = require('../../../src/db/Class')

jest.mock('../../../src/db/Class')

describe('Teacher Roll-call', () => {
    const campusId = new ObjectId()
    const classId = new ObjectId()
    const teacherId = '6Rr4yeijk3NVYdwZXzhxmkkH3ts9'
    let auth: any
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
    it('roll-call flow', async () => {
        Class.getClassById.mockResolvedValue(validClass)

        const course = await (await server.getInstance()).callApi('courses/CreateCourse', {
            name: 'Chemistry',
            teacher_id: teacherId,
            class_id: classId,
            campus_id: campusId
        })

        expect(course.isSucc).toEqual(true)
        
        const token = await auth.currentUser?.getIdToken()
        const ret1 = await (await server.getInstance()).callApi('roll-call/TeacherGetRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
        expect(ret1.err?.message).not.toBeNull()

        const ret2 = await (await server.getInstance()).callApi('roll-call/StartRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret2.isSucc).toEqual(true)
        expect(ret2.res?.roll_call).toMatchObject({
            roll_call_started: true
        })
        
        const ret3 = await (await server.getInstance()).callApi('roll-call/TeacherGetRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret3.isSucc).toEqual(true)
        expect(ret3.res?.enrollment_info).toMatchObject({
            roll_call_started: true
        })

        const ret4 = await (await server.getInstance()).callApi('roll-call/StartRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret4.isSucc).toEqual(false)
        expect(ret4.err?.message).not.toBeNull()

        const ret5 = await (await server.getInstance()).callApi('roll-call/EndRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId,
            enrollment_id: ret3.res?.enrollment_info._id as ObjectId
        })
        expect(ret5.isSucc).toEqual(true)

        const ret6 = await (await server.getInstance()).callApi('roll-call/TeacherGetRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret6.isSucc).toEqual(false)
    })
    
})
