import { ObjectId } from 'mongodb'

import { getClassById } from '../db/Class'
import { validateObjectId } from '../helpers/validator'
import { DbClass } from '../shared/db/DbClass'
import { ModelReturnType } from './ModelReturnType'

export const getClass = async (classId: ObjectId):
  Promise<ModelReturnType<DbClass | undefined>> => {
    if (!validateObjectId(classId)) {
        return {
            value: undefined,
            errorMessage: 'Use a valid class id'
        }
    }
    const retrievedClass = await getClassById(classId)

    if (!retrievedClass) {
        return {
            value: undefined,
            errorMessage: 'No class found'
        }
    } 
    return {
        value: retrievedClass
    }
}
