import { ObjectId } from "mongodb"
import { DbEnrollment } from "../shared/db/DbEnrollment"
import { Global } from "./Global"

export const getCourseById = async (courseId: ObjectId) => {
    return await Global.collection('Course').findOne({
        _id: courseId
    })
}

export const getCoursesByTeacherId = async (teacherId: string | undefined, errorFunction: (errorMessage: string) => void) => {
    const courses = await Global.collection('Course').find({
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
        const courses = await Global.collection('Course').find({
            teacher_id: teacherId, class_id: classId
        }).toArray()
    
        if(!courses) {
            errorFunction('No courses found')
            return []
        }
    
        return courses
}
export const addEnrollmentToCourse = async (courseId: ObjectId, newEnrollment: DbEnrollment) => {
    const res = await Global.collection('Course').updateOne(
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
    const course = await Global.collection('Course').findOneAndUpdate(
        { "enrollments._id": enrollmentId },
        { 
            "$set": { "enrollments.$.roll_call_started": false }
        }
    )
    return course
}