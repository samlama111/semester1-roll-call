import { getAllClasses } from '../db/Class'
import { DbClass } from '../shared/db/DbClass'
import { ModelReturnType } from './ModelReturnType'

export const listClasses = async ():
  Promise<ModelReturnType<DbClass[] | undefined>> => {
    const classes = await getAllClasses()

    if (!classes) {
        return {
            value: undefined,
            errorMessage: 'No classes found'
        }
    } 

    return {
        value: classes
    }
}
