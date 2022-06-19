import { ObjectId } from 'mongodb'

import { getCoursesByTeacherClassId, getCoursesByTeacherId } from '../db/Course'
import { DbCourse } from '../shared/db/DbCourse'
import { ModelReturnType } from './ModelReturnType'
    
export const getTeacherCourses = async (teacherId?: string, classId?: ObjectId):
 Promise<ModelReturnType<DbCourse[] | undefined>> => {
    let courses: DbCourse[]
    if (classId) {
        const teacherCourses = await getCoursesByTeacherClassId(classId, teacherId)
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
