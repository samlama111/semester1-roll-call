import { DbStudent } from '../shared/db/DbStudent'
import { Global } from './Global'

const collectionName = 'Student'

export const createStudent = async (newStudent: DbStudent) => {
    return Global.collection(collectionName).insertOne(newStudent)
}
