import { ObjectId } from 'mongodb'

import { getTeacherById } from '../db/Teacher'
import { validateObjectId } from '../helpers/validator'
import { DbTeacher } from '../shared/db/DbTeacher'
import { ModelReturnType } from './ModelReturnType'

export const getTeacher = async (teacherId: ObjectId):
  Promise<ModelReturnType<DbTeacher | undefined>> => {
    if (!validateObjectId(teacherId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid teacher id'
        }
    }
    const teacher = await getTeacherById(teacherId)

    if (!teacher) {
        return {
            value: undefined,
            errorMessage: 'No teacher found'
        }
    } 
    return {
        value: teacher
    }
}
