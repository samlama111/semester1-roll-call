import { ObjectId } from 'mongodb'

import { getCoursesByTeacherId } from '../db/Course'
import { DbCourse } from '../shared/db/DbCourse'
import { ModelReturnType } from './ModelReturnType'
    
export const getTeacherCourses = async (teacherId: string | undefined, classId: ObjectId | undefined):
 Promise<ModelReturnType<DbCourse[] | undefined>> => {
    let courses: DbCourse[]
    if (classId) {
        const teacherCourses = await getCoursesByTeacherId(teacherId)
        if (!teacherCourses.value) {
            return {
                value: undefined,
                errorMessage: teacherCourses.errorMessage
            }
        } 
        courses = teacherCourses.value
    } else {
        const teacherCourses = await getCoursesByTeacherId(teacherId)
        if (!teacherCourses.value) {
            return {
                value: undefined,
                errorMessage: teacherCourses.errorMessage
            }
        } 
        courses = teacherCourses.value
    }

    return {
        value: courses
    }
}