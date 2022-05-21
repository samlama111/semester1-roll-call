import { ObjectId } from 'mongodb'

import { getMostRecentTeachersCourseEnrollment } from '../db/Course'
import { validateObjectId } from '../helpers/validator'
import { DbEnrollment } from '../shared/db/DbEnrollment'
import { ModelReturnType } from './ModelReturnType'
    
export const getTeacherLastActiveRollCall = async (teacherId: string | undefined, courseId: ObjectId):
 Promise<ModelReturnType<DbEnrollment | undefined>> => {
    if (!validateObjectId(courseId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid course id'
        } 
    }
    const activeEnrollment = await getMostRecentTeachersCourseEnrollment(teacherId, courseId)

    if (!activeEnrollment) {
        return {
            value: undefined,
            errorMessage: 'No roll-call found'
        }
    }

    return {
        value: activeEnrollment.last
    }
}
