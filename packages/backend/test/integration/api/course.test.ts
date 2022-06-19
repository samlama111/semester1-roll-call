/* eslint-disable camelcase */
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import firebaseAdmin from 'firebase-admin'
import { ObjectId } from 'mongodb'

import { DbCampus } from '../../../src/shared/db/DbCampus'
import { DbClass } from '../../../src/shared/db/DbClass'
import { server } from '../../../testSetup'

describe('Course', () => {
    let createdClass: DbClass | undefined
    let createdCampus: DbCampus | undefined
    const teacherId = '6Rr4yeijk3NVYdwZXzhxmkkH3tz3'
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
        const ret1 = await (await server.getInstance()).callApi('classes/CreateClass', {
            name: 'New class'
        })
        createdClass = ret1.res?.class
        expect(ret1.isSucc).toEqual(true)
    })
    it('should create a campus', async () => {
        const ret1 = await (await server.getInstance()).callApi('campuses/CreateCampus', {
            address: '181 Cougar Rd',
            name: 'School',
            radius: 0.3
        })
        createdCampus = ret1.res?.campus
        expect(ret1.isSucc).toEqual(true)
    })
    it('should create a course', async () => {
        const ret1 = await (await server.getInstance()).callApi('courses/CreateCourse', {
            name: 'Sams KEA',
            campus_id: createdCampus?._id as ObjectId,
            class_id: createdClass?._id as ObjectId,
            teacher_id: teacherId
        })
        expect(ret1.isSucc).toEqual(true)
    })
    
    it('should get teachers classes courses', async () => {
        const token = await auth.currentUser?.getIdToken()

        const ret1 = await (await server.getInstance()).callApi('courses/GetCourses', {
            jwtToken: token,
            class_id: createdClass?._id as ObjectId
        })

        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res).not.toBeNull()
        expect(ret1.res?.courses.some((
            { name, teacher_id }
        ) => name === 'Sams KEA' && teacher_id === teacherId)).toBe(true)
    })
    it('should get teachers courses', async () => {
        const token = await auth.currentUser?.getIdToken()

        const ret1 = await (await server.getInstance()).callApi('courses/GetCourses', {
            jwtToken: token
        })

        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res).not.toBeNull()
        expect(ret1.res?.courses.some((
            { name, teacher_id }
        ) => name === 'Sams KEA' && teacher_id === teacherId)).toBe(true)
    })
    it('should get teachers classes', async () => {
        const token = await auth.currentUser?.getIdToken()

        const ret1 = await (await server.getInstance()).callApi('classes/GetClasses', {
            jwtToken: token
        })
        expect(ret1.isSucc).toEqual(true)
        expect(ret1.res?.classes.some(({ name }) => name === 'New class')).toBe(true)
    })
})
