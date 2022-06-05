import { getCoursesByTeacherId } from '../db/Course'
import { DbClass } from '../shared/db/DbClass'
import { ModelReturnType } from './ModelReturnType'
    
export const getTeacherClasses = async (teacherId?: string):
 Promise<ModelReturnType<DbClass[] | undefined>> => {
    // query db for this teacher's classes
    const courses = await getCoursesByTeacherId(teacherId)
    if (!courses.value) {
        return {
            value: undefined,
            errorMessage: courses.errorMessage
        }
    }
    // get class info from Course objects
    const classInfo = courses.value.map((course) => {
        return {
            name: course.class_name,
            _id: course.class_id
        }
    })
    
    return {
        value: classInfo
    }
}
