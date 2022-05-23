import { getAllStudents } from '../db/Student'
import { DbTeacher } from '../shared/db/DbTeacher'
import { ModelReturnType } from './ModelReturnType'

export const listStudents = async ():
  Promise<ModelReturnType<DbTeacher[] | undefined>> => {
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
