import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithCustomToken
} from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { server } from '../../../testSetup'
import { validCampus } from '../../__mocks__/campus'

const Campus = require('../../../src/db/Campus')

jest.mock('../../../src/db/Campus')

describe('Attendance', () => {
    let courseId: ObjectId | undefined
    let classId: ObjectId | undefined
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

    it('should create a class', async () => {
        // Get data before add
        const ret1 = await (await server.getInstance()).callApi('classes/CreateClass', {
            name: 'Sams class',
        })
        classId = ret1.res?.class._id
        expect(ret1.isSucc).toEqual(true)
    })

    it('should create a course', async () => {
        Campus.getCampusById.mockResolvedValue(validCampus)

        const ret1 = await (await server.getInstance()).callApi('courses/CreateCourse', {
            name: 'Chemistry',
            teacher_id: teacherId,
            class_id: classId as ObjectId,
            campus_id: validCampus._id
        })
        courseId = ret1.res?.course._id
        expect(ret1.isSucc).toEqual(true)
    })

    it('should get classes attendance', async () => {
        const ret1 = await (await server.getInstance()).callApi('attendance/GetByClass', {
            class_id: classId as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(true)
    })
    it('should not get classes attendance', async () => {
        const ret1 = await (await server.getInstance()).callApi('attendance/GetByClass', {
            class_id: '123' as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
    })

    it('should get courses attendance', async () => {
        const ret1 = await (await server.getInstance()).callApi('attendance/GetByCourse', {
            course_id: courseId as ObjectId
        })
        expect(ret1.res?.attendance.class_name).not.toEqual(undefined)
    })
    it('should not get courses attendance', async () => {
        const ret1 = await (await server.getInstance()).callApi('attendance/GetByCourse', {
            course_id: '123' as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
    })
})
