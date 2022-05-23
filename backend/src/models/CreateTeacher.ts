import { ObjectId } from 'mongodb'

import { insertTeacher } from '../db/Teacher'
import { isEmailValid, validateStringName } from '../helpers/validator'
import { DbTeacher } from '../shared/db/DbTeacher'
import { ModelReturnType } from './ModelReturnType'
    
export const createTeacher = async (firstName: string, lastName: string, email: string, teacherId: string | undefined)
: Promise<ModelReturnType<DbTeacher | undefined>> => {
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
    
    const newTeacher: DbTeacher = {
        _id: new ObjectId(),
        uid: teacherId as string,
        firstname: firstName,
        lastname: lastName,
        email
    }
     
    const res = await insertTeacher(newTeacher)

    if (!res.acknowledged) {
        return {
            value: undefined,
            errorMessage: 'Create was not successful'
        }
    }
    
    return {
        value: newTeacher
    }
}
