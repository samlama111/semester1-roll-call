import { ObjectId } from 'mongodb'

import { getCourseById } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { DbCourse } from '../shared/db/DbCourse'
import { ModelReturnType } from './ModelReturnType'

export const getCourse = async (courseId: ObjectId):
  Promise<ModelReturnType<DbCourse | undefined>> => {
    if (!validateObjectId(courseId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid course id'
        }
    }
    const course = await getCourseById(courseId)

    if (!course) {
        return {
            value: undefined,
            errorMessage: 'No course found'
        }
    } 
    return {
        value: course
    }
}
