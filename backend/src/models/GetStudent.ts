import { ObjectId } from 'mongodb'

import { getStudentById } from '../db/Student'
import { validateObjectId } from '../helpers/validator'
import { DbStudent } from '../shared/db/DbStudent'
import { ModelReturnType } from './ModelReturnType'

export const getStudent = async (studentId: ObjectId):
  Promise<ModelReturnType<DbStudent | undefined>> => {
    if (!validateObjectId(studentId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid student id'
        }
    }
    const student = await getStudentById(studentId)

    if (!student) {
        return {
            value: undefined,
            errorMessage: 'No student found'
        }
    } 
    return {
        value: student
    }
}
