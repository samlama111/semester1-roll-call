import { ObjectId } from 'mongodb'

import { insertClass } from '../db/Class'
import { sanitizeString } from '../helpers/stringHandler'
import { validateNameLength } from '../helpers/validator'
import { DbClass } from '../shared/db/DbClass'
import { ModelReturnType } from './ModelReturnType'
    
export const createClass = async (name: string): Promise<ModelReturnType<DbClass | undefined>> => {
    const className = sanitizeString(name)
    if (!validateNameLength(className)) {
        return {
            value: undefined,
            errorMessage: 'Class name format is not correct'
        }
    }
    const newClass: DbClass = {
        _id: new ObjectId(),
        name: className
    }
         
    const res = await insertClass(newClass)
    
    if (!res.acknowledged) {
        return {
            value: undefined,
            errorMessage: 'Create was not successful'
        }
    }
    
    return {
        value: newClass
    }
}
