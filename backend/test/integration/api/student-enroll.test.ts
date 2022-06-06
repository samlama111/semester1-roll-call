import { initializeApp } from 'firebase/app'
import {
    getAuth, signInWithCustomToken
} from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { server } from '../../../testSetup'
import { validCampus } from '../../__mocks__/campus'
import { validClass } from '../../__mocks__/class'
import { validLocation } from '../../__mocks__/geolocationMockData'

const Class = require('../../../src/db/Class')
const Campus = require('../../../src/db/Campus')

jest.mock('../../../src/db/Class')
jest.mock('../../../src/db/Campus')

describe('Student enroll', () => {
    const campusId = validCampus._id
    const classId = new ObjectId()
    const studentId = '6Rr4yeijk3NVYdwZXzhxmkkH3ts4'
    let auth: any
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
    it('enrollment flow', async () => {
        const token = await auth.currentUser?.getIdToken()
        Class.getClassById.mockResolvedValue(validClass)
        Campus.getCampusById.mockResolvedValue(validCampus)

        const course = await (await server.getInstance()).callApi('courses/CreateCourse', {
            name: 'Chemistry',
            teacher_id: studentId,
            class_id: classId,
            campus_id: campusId
        })

        expect(course.isSucc).toEqual(true)
        
        const ret1 = await (await server.getInstance()).callApi('roll-call/StartRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId
        })
        expect(ret1.isSucc).toEqual(true)
        
        const ret2 = await (await server.getInstance()).callApi('roll-call/GetRollCall', {
            jwtToken: token
        })
        expect(ret2.isSucc).toEqual(true)

        const ret3 = await (await server.getInstance()).callApi('roll-call/Enroll', {
            jwtToken: token,
            enrollment_id: ret2.res?.roll_call_id as ObjectId,
            location: validLocation
        })
        expect(ret3.isSucc).toEqual(true)

        const ret4 = await (await server.getInstance()).callApi('roll-call/Enroll', {
            jwtToken: token,
            enrollment_id: ret2.res?.roll_call_id as ObjectId,
            location: validLocation
        })
        expect(ret4.isSucc).toEqual(false)

        const ret5 = await (await server.getInstance()).callApi('roll-call/EndRollCall', {
            jwtToken: token,
            course_id: course.res?.course._id as ObjectId,
            enrollment_id: ret2.res?.roll_call_id as ObjectId
        })
        expect(ret5.isSucc).toEqual(true)
    })
    
})
