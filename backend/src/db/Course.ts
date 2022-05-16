import { ObjectId } from "mongodb"
import { DbEnrollment } from "../shared/db/DbEnrollment"
import { Global } from "./Global"

const collectionName = 'Course'

export const getCourseById = async (courseId: ObjectId) => {
    return await Global.collection(collectionName).findOne({
        _id: courseId
    })
}

export const getCoursesByTeacherId = async (teacherId: string | undefined, errorFunction: (errorMessage: string) => void) => {
    const courses = await Global.collection(collectionName).find({
        teacher_id: teacherId
    }).toArray()

    if(!courses) {
        errorFunction('No courses found')
        return []
    }

    return courses
}

export const getCoursesByTeacherClassId = async (
    teacherId: string | undefined, 
    classId: ObjectId, 
    errorFunction: (errorMessage: string) => void) => {
        const courses = await Global.collection(collectionName).find({
            teacher_id: teacherId, class_id: classId
        }).toArray()
    
        if(!courses) {
            errorFunction('No courses found')
            return []
        }
    
        return courses
}
export const getFirstCourseCampusIdByEnrollmentId = async (enrollmentId: ObjectId) => {
    return await Global.collection(collectionName).findOne({
        "enrollments._id": enrollmentId
    }, { projection: { campus_id: 1 } })
}

export const addEnrollmentToCourse = async (courseId: ObjectId, newEnrollment: DbEnrollment) => {
    const res = await Global.collection(collectionName).updateOne(
        { 
            _id: courseId
        },
        { 
            $push: {
                "enrollments": newEnrollment
            }
        }
    )
    return res
}
export const setEnrollmentNotActive = async (enrollmentId: ObjectId) => {
    const course = await Global.collection(collectionName).findOneAndUpdate(
        { "enrollments._id": enrollmentId },
        { 
            "$set": { "enrollments.$.roll_call_started": false }
        }
    )
    return course
}
export const getMostRecentStudentEnrollment = async (studentId: string | undefined) => {
    const roll_call = await Global.collection(collectionName).aggregate(
        [
            {
                $match: { "students.uid": studentId,  },
            },
            { $addFields: { last: { $last: "$enrollments" } } },
            { $match: { "last.roll_call_started": true } }
        ]
    ).toArray()

    return roll_call[0]
}
export const enrollStudent = async (studentId: string | undefined, enrollmentId: ObjectId) => {
    return await Global.collection(collectionName).updateOne(
        { 
            "enrollments._id": enrollmentId,
        },
        { "$addToSet": 
            {
                "enrollments.$.enrolled_student_ids": studentId
            }
        }
    )
}
