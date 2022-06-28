import { ObjectId } from 'mongodb'

import { ModelReturnType } from '../models/ModelReturnType'
import { DbCourse } from '../shared/db/DbCourse'
import { DbEnrollment } from '../shared/db/DbEnrollment'
import { Global } from './Global'

const collectionName = 'Course'

export const getCourseById = async (courseId: ObjectId) => {
    return Global.collection(collectionName).findOne({
        _id: courseId
    })
}
export const insertCourse = async (course: DbCourse) => {
    return Global.collection(collectionName).insertOne(course)
}

export const getCoursesByTeacherId = async (
    teacherId?: string
): Promise<ModelReturnType<DbCourse[] | undefined>> => {
    const courses = await Global.collection(collectionName).find({
        teacher_id: teacherId
    }).toArray()

    if (courses.length < 1) {
        return {
            value: undefined,
            errorMessage: 'No courses found'
        }
    }

    return {
        value: courses
    }
}
export const getCoursesByClassId = async (
    classId: ObjectId
): Promise<ModelReturnType<DbCourse[] | undefined>> => {
    const courses = await Global.collection(collectionName).find({
        class_id: classId
    }).toArray()
    
    if (!courses) {
        return {
            value: undefined,
            errorMessage: 'No courses found'
        }
    }
    
    return { value: courses } 
}
export const getCoursesByTeacherClassId = async (
    classId: ObjectId,
    teacherId?: string 
): Promise<ModelReturnType<DbCourse[] | undefined>> => {
    const courses = await Global.collection(collectionName).find({
        teacher_id: teacherId, class_id: classId
    }).toArray()
    
    if (!courses) {
        return {
            value: undefined,
            errorMessage: 'No courses found'
        }
    }
    
    return { value: courses } 
}
export const getFirstCourseCampusIdByEnrollmentId = async (enrollmentId: ObjectId) => {
    return Global.collection(collectionName).findOne({
        'enrollments._id': enrollmentId
    }, { projection: { campus_id: 1 } })
}

export const addEnrollmentToCourse = async (courseId: ObjectId, newEnrollment: DbEnrollment) => {
    const res = await Global.collection(collectionName).updateOne(
        { 
            _id: courseId
        },
        { 
            $push: {
                enrollments: newEnrollment
            }
        }
    )
    return res
}
export const setEnrollmentNotActive = async (enrollmentId: ObjectId) => {
    const course = await Global.collection(collectionName).findOneAndUpdate(
        { 'enrollments._id': enrollmentId },
        { 
            $set: { 'enrollments.$.roll_call_started': false }
        }
    )
    return course
}
export const getMostRecentTeachersCourseEnrollment = async (courseId: ObjectId, teacherId?: string) => {
    try {
        const rollCall = await Global.collection(collectionName).aggregate(
            [
                { $project: { _id: courseId, teacher_id: teacherId, enrollments: { $slice: ['$enrollments', -1] } } },
                { $match: { 'enrollments.roll_call_started': true } }
            ]
        ).toArray()
        if (!rollCall[0]) return undefined
        return rollCall[0].enrollments[0] as DbEnrollment

    } catch (err) { console.log(err); return undefined }
}
export const getMostRecentStudentEnrollment = async (studentId?: string) => {
    try {
        const rollCall = await Global.collection(collectionName).aggregate(
            [
                { $match: { 'students.uid': studentId } },
                { $project: { enrollments: { $slice: ['$enrollments', -1] } } },
                { $match: { 'enrollments.roll_call_started': true } }
            ]
        ).toArray()
        if (!rollCall[0]) return undefined
        return rollCall[0] as DbCourse

    } catch (err) { console.log(err); return undefined }
}
export const enrollStudent = async (enrollmentId: ObjectId, studentId?: string) => {
    return Global.collection(collectionName).updateOne(
        { 
            'enrollments._id': enrollmentId,
        },
        {
            $addToSet: 
            {
                'enrollments.$.enrolled_student_ids': studentId
            }
        }
    )
}

export default {
    insertCourse, getMostRecentStudentEnrollment, addEnrollmentToCourse, enrollStudent, setEnrollmentNotActive 
}
