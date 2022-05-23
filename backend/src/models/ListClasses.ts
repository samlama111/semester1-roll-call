import { getAllClasses } from '../db/Class'
import { DbClass } from '../shared/db/DbClass'
import { ModelReturnType } from './ModelReturnType'

export const listClasses = async ():
  Promise<ModelReturnType<DbClass[] | undefined>> => {
    const courses = await getAllClasses()

    if (!courses) {
        return {
            value: undefined,
            errorMessage: 'No classes found'
        }
    } 

    return {
        value: courses
    }
}
