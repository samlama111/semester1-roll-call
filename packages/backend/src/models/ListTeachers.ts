import { getAllTeachers } from '../db/Teacher'
import { DbTeacher } from '../shared/db/DbTeacher'
import { ModelReturnType } from './ModelReturnType'

export const listTeachers = async ():
  Promise<ModelReturnType<DbTeacher[] | undefined>> => {
    const teachers = await getAllTeachers()

    if (!teachers) {
        return {
            value: undefined,
            errorMessage: 'No teachers found'
        }
    } 

    return {
        value: teachers
    }
}
