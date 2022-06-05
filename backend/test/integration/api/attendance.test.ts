/* eslint-disable no-undef */

import firebaseAdmin from 'firebase-admin'
import { initializeApp } from 'firebase-admin/lib/app'
import { ObjectId } from 'mongodb'
import path from 'path'
import { HttpServer } from 'tsrpc'

import { Global } from '../../../src/db/Global'
import { serviceProto, ServiceType } from '../../../src/shared/protocols/serviceProto'

describe('Attendance', () => {
    let courseId: ObjectId | undefined
    let classId: ObjectId | undefined
    let campusId: ObjectId | undefined
    const teacherId = '6Rr4yeijk3NVYdwZXzhxmkkH3ts1'
    let teacherJwt: string | undefined
    let server: HttpServer<ServiceType>
    beforeAll(async () => {
        server = new HttpServer(serviceProto)
        await server.autoImplementApi(path.resolve(__dirname, '../../../src/api'))
    
        await server.start()
        await Global.initDb(server.logger)
        initializeApp({
            credential: firebaseAdmin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // replace `\` and `n` character pairs w/ single `\n` character
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        })
        teacherJwt = await firebaseAdmin.auth().createCustomToken(teacherId)
    })
    afterAll(async () => {
        await server.stop()
    })

    it('should create a campus', async () => {
        // Get data before add
        const ret1 = await server.callApi('campuses/CreateCampus', {
            address: 'Guldbergsgade 29N',
            name: 'Sams KEA',
            radius: 0.3
        })
        expect(ret1.isSucc).toEqual(true)
        campusId = ret1.res?.campus._id
    })

    it('should create a class', async () => {
        // Get data before add
        const ret1 = await server.callApi('classes/CreateClass', {
            name: 'Sams class',
        })
        expect(ret1.isSucc).toEqual(true)
        classId = ret1.res?.class._id
    })

    it('should create a teacher', async () => {
        // Get data before add
        const ret1 = await server.callApi('teachers/CreateTeacher', {
            firstname: 'John',
            lastname: 'Doe',
            email: 'Johndoe@gmail.com',
            jwtToken: teacherJwt
        })
        expect(ret1.isSucc).toEqual(true)
    })

    it('should get classes attendance', async () => {
        const ret1 = await server.callApi('attendance/GetByClass', {
            class_id: classId as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(true)
    })
    it('should not get classes attendance', async () => {
        const ret1 = await server.callApi('attendance/GetByClass', {
            class_id: '123' as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
    })

    it('should create a course', async () => {
        const ret1 = await server.callApi('courses/CreateCourse', {
            name: 'Chemistry',
            teacher_id: teacherId as string,
            class_id: classId as ObjectId,
            campus_id: campusId as ObjectId
        })
        expect(ret1.isSucc).toEqual(true)
        courseId = ret1.res?.course._id
    })
    it('should get courses attendance', async () => {
        const ret1 = await server.callApi('attendance/GetByCourse', {
            course_id: courseId as ObjectId
        })
        expect(ret1.res?.attendance.class_name).not.toEqual(undefined)
    })
    it('should not get courses attendance', async () => {
        const ret1 = await server.callApi('attendance/GetByCourse', {
            course_id: '123' as unknown as ObjectId
        })
        expect(ret1.isSucc).toEqual(false)
    })
})
