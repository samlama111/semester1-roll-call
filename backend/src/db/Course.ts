import { ObjectId } from "mongodb"
import { Global } from "./Global"

export const getCourseById = async (courseId: ObjectId) => {
    return await Global.collection('Course').findOne({
        _id: courseId
    })
}

export const getCourseByTeacherId = async (teacherId: string | undefined, errorFunction: (errorMessage: string) => void) => {
    const courses = await Global.collection('Course').find({
        teacher_id: teacherId
    }).toArray()

    if(!courses) {
        errorFunction('No courses found')
        return []
    }

    return courses
}