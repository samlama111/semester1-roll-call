import { ObjectId } from 'mongodb'

import { insertStudent } from '../db/Student'
import { isEmailValid, validateStringName } from '../helpers/validator'
import { DbStudent } from '../shared/db/DbStudent'
import { ModelReturnType } from './ModelReturnType'
    
export const createStudent = async (firstName: string, lastName: string, email: string, studentId: string | undefined)
: Promise<ModelReturnType<DbStudent | undefined>> => {
    if (!validateStringName(firstName) && !validateStringName(lastName)) {
        return {
            value: undefined,
            errorMessage: 'Invalid name'
        }
    }
    if (!isEmailValid(email)) {
        return {
            value: undefined,
            errorMessage: 'Invalid email used'
        }
    }
    
    const newStudent: DbStudent = {
        _id: new ObjectId(),
        uid: studentId as string,
        firstname: firstName,
        lastname: lastName,
        email
    }
     
    const res = await insertStudent(newStudent)

    if (!res.acknowledged) {
        return {
            value: undefined,
            errorMessage: 'Create was not successful'
        }
    }
    
    return {
        value: newStudent
    }
}
