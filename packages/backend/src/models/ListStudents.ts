import { getAllStudents } from '../db/Student'
import { DbStudent } from '../shared/db/DbStudent'
import { ModelReturnType } from './ModelReturnType'

export const listStudents = async ():
  Promise<ModelReturnType<DbStudent[] | undefined>> => {
    const students = await getAllStudents()

    if (!students) {
        return {
            value: undefined,
            errorMessage: 'No students found'
        }
    } 

    return {
        value: students
    }
}
